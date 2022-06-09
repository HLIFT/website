import * as path from "path";
import * as Fastify from "fastify";
import FastifyStatic from "@fastify/static";

export default async function (server: Fastify.FastifyInstance): Promise<void> {
    await server.register(FastifyStatic, {
        maxAge: 31536000000,
        root: path.join(__dirname, "../../frontend/dist")
    });

    await server.register(FastifyStatic, {
        decorateReply: false,
        maxAge: 31536000000,
        prefix: "/overlay",
        root: path.join(__dirname, "../../overlay/dist")
    });

    await server.setNotFoundHandler((request, reply) => {
        if (request.url.startsWith("/static/overlay")){
            reply.sendFile("index.html", path.join(__dirname, "../../overlay/dist"));
            return;
        }
        reply.sendFile("index.html", path.join(__dirname, "../../frontend/dist"));
    });
}
