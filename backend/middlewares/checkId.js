import { isValidObjectId } from "mongoose";
function checkId(req, res, next) {
  console.log("ID to validate:", req.params.id);
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object of ${req.params.id}`);
  }
  next();
}

export default checkId;
