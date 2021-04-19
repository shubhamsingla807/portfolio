async function routes(fastify, options) {
	fastify.get("/", async (request, reply) => {
		return reply.send("<h1>hello</h1>");
	});
}

module.exports = routes;
