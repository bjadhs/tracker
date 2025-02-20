import aj from "../config/arcjet.js";
const arcjetMiddleware = async (req, res, next) => {
    const decision = await aj.protect(req);
    console.log("Arcjet decision", decision);
  
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Too Many Requests" }));
      } else if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No bots allowed" }));
      } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
      }
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello World" }));
    }
  };
  
  export default arcjetMiddleware;