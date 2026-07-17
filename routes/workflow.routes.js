import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get("/", async (req, res) => {
  res.send({
    success: true,
    message: "Workflow route is working",
  });
});

export default workflowRouter;