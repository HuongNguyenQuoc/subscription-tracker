import aj from '../config/arcjet.js';

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please try again later.',
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: 'Bot access is not allowed.',
        });
      }

      if (decision.reason.isShield()) {
        return res.status(403).json({
          success: false,
          message: 'Suspicious request detected.',
        });
      }

      return res.status(403).json({
        success: false,
        message: 'Request denied.',
      });
    }
    next();

  } catch (error) {
    next(error);
  }
};