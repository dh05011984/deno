// console.log('jai mata di .... dhananjay');
import { Application, flags } from "./deps.ts";
import { oakCors } from "./deps.ts";
// import { config } from "./deps.ts";

import router from "./routes/normal.ts";
import protectedRouter from "./routes/protected.ts";

import notFound from "./404.ts";
import authMiddleware from "./middleware/auth.ts";

const app = new Application();
// const env = config();
// const HOST = env.APP_HOST || "http://localhost";
// const PORT = +env.APP_PORT || 4000;
// console.log('kh', env.DATABASECON);

const { args, exit } = Deno;
const DEFAULT_PORT = 8080;
const argPort = flags.parse(args).port;
const PORT = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(PORT)) {
  console.log("port is not number");
  exit(1);
}

// enable cors
// app.use(oakCors({
//   origin: 'http://localhost:8080/api/v1/',
//   optionsSuccessStatus: 200,
// }));
app.use(oakCors()); // Enable CORS for All Route
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  // console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});
app.use(router.routes());
app.use(router.allowedMethods());
// app.use((ctx: any, next: any) => authMiddleware.authorized(ctx, next)); // for authorization
app.use(protectedRouter.routes());
app.use(notFound);

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(`--- Listening on: ${secure ? "https://" : "http://"}${
    hostname ?? "localhost"
    }:${port}`
  );
});

// for error
app.addEventListener("error", (e) => {
  console.log("Error:-", e.error);
});

await app.listen({ port: PORT });
