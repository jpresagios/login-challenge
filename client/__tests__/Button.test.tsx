import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/app/components';

describe('Button', () => {
  it('should trigger onClick action', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should not submit native forms by default', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(
      <form
        onSubmit={(e) => {
          onSubmit();
          e.preventDefault();
        }}
      >
        <Button>Click me</Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should submit native form when type is set to "submit"', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(
      <form
        onSubmit={(e) => {
          onSubmit();
          e.preventDefault();
        }}
      >
        <Button type="submit">Click me</Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onSubmit).toHaveBeenCalled();
  });

  describe('disabled', () => {
    it('should support disabled state', () => {
      render(<Button disabled>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not trigger onClick action', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>,
      );
      await user.click(screen.getByRole('button', { name: 'Click me' }));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
