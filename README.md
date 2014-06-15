# Botify-saas Javascript SDK 

SDK to help you build and run queries on the Botify-Saas API.

This modules will help you to:

- Login to API and request a token
- Use the token to make a request to the Botify API
- Provide classes to help building queries and requesting data from the API

## Example

Add the js to your page like this:

```js
<script src="botify-saas-js-sdk.js"></script>
<script>
  var myrequest = new Botify.Request();
  myrequest.get();
  /* ... have fun ... */
</script>
```

## Developement

### Installation

```sh
git clone git@github.com:sem-io/botify-saas-js-sdk.git botify-js-sdk
cd botify-js-sdk
npm install

```

### Workflow

This project includes a grunt configuration to compile it from the coffeescript files.

There is also a task to run a basic server, to run it launch:

```sh
grunt http-server:dev
```

The `watch` task will watch any change on the coffee files and recompile the files
```sh
grunt watch
```

License
----

