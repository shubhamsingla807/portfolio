const fastify = require("fastify")({
	logger: true,
});
const path = require("path");

// static content
fastify.register(require("fastify-static"), {
	root: path.join(__dirname, "public"),
	prefix: "/public/", // optional: default '/'
});

// Declare a route
fastify.get("/", function (request, reply) {
	return reply.sendFile("home.html");
});

// Run the server!
fastify.listen(process.env.PORT || 8080, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	fastify.log.info(`server listening on ${address}`);
});
