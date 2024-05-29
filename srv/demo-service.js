const cds = require("@sap/cds");
const { v4: uuidv4 } = require("uuid");

module.exports = (srv) => {
  const { ActionStatus } = srv.entities;

  srv.on("v4asyncAction", async (req) => {
    let id = req.data.ID;
    let ID = uuidv4();

    setTimeout(async () => {
      await UPDATE(ActionStatus, { actionId: id }).with({
        status: "Completed",
      });
      req.reply("Action completed successfully");
    }, 60000);

    let entry = {
      ID,
      actionId: id,
      status: "In Progress",
    };
    await INSERT.into(ActionStatus).entries(entry);

    if (req.headers.prefer && req.headers.prefer.includes("respond-async")) {
      req.res
        .status(202)
        .set("Location", `/odata/v4/service/demo/ActionStatus(${ID})`)
        .send();
    } else {
      req.error(400, "Synchronous processing not supported");
    }
  });

  srv.on("READ", ActionStatus, async (req) => {
    const { ID } = req.data;
    const result = await SELECT.from(ActionStatus).where({ ID });

    if (result.length > 0) {
      return result[0];
    } else {
      req.error(404, `Task with ID ${ID} not found`);
    }
  });
};
