# Coding Challenge

I hope you like the work I have done. I have try to give a good solution to the challenge,
always knowing that it's posible to improve what I have done.

## Prerequisites

To have installed:

- Nodejs
  ```
  https://nodejs.org/en/download/
  ```

## Run locally

Executed each application (client, server) using the Readme files inside these.

## Automated deploy using Docker

Have docker and docker-compose in your computer

```
https://docs.docker.com/compose/install/
```

```
docker-compose up --build

Navigate to http://localhost:3000

```

#### Features that I want to add or improve

1. Test the support for different browsers using [BrowserStack](https://browserstack.com).

2. Improve the tests.

3. Check performance in deep.

4. Ensuring Component Accessibility

5. Security, invalidated based on JWT expiration, ensuring that access is revoked when the token expires.

6. Improve error handlers.

7. Improvde repsonsive design


### Small guideline about components

The Challenge explored a potential solution using tailwind-variants to create components that can easily accommodate specific design variants. This approach simplifies the implementation and management of design variations, as tailwind-variants allows you to declaratively inject classes based on the selected variant.


```tsx
<TextField.Root>
  <TextField.Input />
</TextField.Root>
```


```tsx
<TextField.Root size="large">
  <TextField.Input />
</TextField.Root>
```

The components are designed to accept new classes, which are merged and take precedence over the internal ones. This allows for easy extension when predefined variants don't fully meet specific UX requirements.

```tsx
<TextField.Root className="h-28">
  <TextField.Input />
</TextField.Root>
```

Simple components (atoms) were built using composition, making it easier to modify their default behavior and swap in different subcomponents as needed.

```tsx
<TextField.Root className="h-28">
  <TextField.Slot>
     <SearchIcon/>
  </TextField.Slot>
  <TextField.Input />
</TextField.Root>
```

Multiple slots are supported

```tsx
<TextField.Root className="h-28">
  <TextField.Slot>
     <SearchIcon/>
  </TextField.Slot>
  <TextField.Input />
  <TextField.Slot>
     <CopyIcon/>
  </TextField.Slot>
</TextField.Root>
```

There is a live page where you can interact with the previous snippet. You can access it via the route: http://localhost:3000/experimental.

### Security base in routes

Protected routes are supported using the authentication session. For example, the /experimental route is protected and can only be accessed by authenticated users.