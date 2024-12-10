import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, TextField } from '@/app/components';

describe('TextField', () => {
  it('should have displayName as TextField.Root', () => {
    expect(TextField.Root.displayName).toEqual('TextField.Root');
  });

  it('should have accessible label when referenced with an id', async () => {
    const Component = () => {
      const id = 'id binding'
      return (
        <>
          <label htmlFor={id}>Label for TextField</label>
          <TextField.Root>
            <TextField.Slot>
              <Button aria-label="More actions">More actions</Button>
            </TextField.Slot>
            <TextField.Input id={id} />
          </TextField.Root>
        </>
      );
    };

    render(<Component />);

    const input = screen.getByRole('textbox', { name: 'Label for TextField' });
    expect(input).toBeInTheDocument();
  });

  it('should render an arbitrary content if passed inside Slot', async () => {
    render(
      <TextField.Root>
        <TextField.Slot>
          <span>Prefix</span>
        </TextField.Slot>
        <TextField.Input />
      </TextField.Root>,
    );

    const prefix = screen.getByText('Prefix');
    expect(prefix).toBeInTheDocument();
  });

  describe('focus', () => {
    it('should focus input when clicked on Input itself', async () => {
      const user = userEvent.setup();

      render(
        <TextField.Root>
          <TextField.Slot>
            <span>Prefix</span>
          </TextField.Slot>
          <TextField.Input />
        </TextField.Root>,
      );

      const input = screen.getByRole('textbox');
      expect(input).not.toHaveFocus();
      await user.click(input);
      await waitFor(() => expect(input).toHaveFocus());
    });

    it('should not focus input when clicked on an active Slot (with button)', async () => {
      const user = userEvent.setup();

      render(
        <TextField.Root>
          <TextField.Input />
          <TextField.Slot>
            <button>Click me</button>
          </TextField.Slot>
        </TextField.Root>,
      );

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: 'Click me' });
      await user.click(button);
      expect(button).toHaveFocus();
      await waitFor(() => expect(input).not.toHaveFocus());
    });
  });

  describe('controlled', () => {
    it('should call onChange when value changes', async () => {
      const user = userEvent.setup();

      const Controller = () => {
        const [value, onChange] = React.useState<string>('');
        return (
          <TextField.Root>
            <TextField.Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </TextField.Root>
        );
      };
      render(<Controller />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'some text');
      expect(input).toHaveValue('some text');
    });
  });
  describe('uncontrolled', () => {
    it('should call onChange when value changes', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <TextField.Root>
          <TextField.Input onChange={(e) => onChange(e.target.value)} />
        </TextField.Root>,
      );

      const input = screen.getByRole('textbox');
      await user.type(input, 'some text');
      expect(onChange).toHaveBeenCalledWith('some text');
    });

    it('should have a default value when defaultValue prop is passed', async () => {
      render(
        <TextField.Root>
          <TextField.Input defaultValue="default text" />
        </TextField.Root>,
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('default text');
    });

    it('should have disabled attribute when disabled TextField.Input', async () => {
      render(
        <TextField.Root>
          <TextField.Input disabled defaultValue="default text" />
        </TextField.Root>,
      );
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });
});
