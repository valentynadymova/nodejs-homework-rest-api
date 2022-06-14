const { Contact } = require("../../models/contact");
const createError = require('../../errors');

const updateContactStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { favorite } = req.body;
      const result = await Contact.findByIdAndUpdate(
        id,
        { favorite },
        {
          new: true,
        }
      );
      if (!favorite) {
        throw createError(400, `missing field favorite `);
      }
      if (!result) {
        throw createError(404, `Not found`);
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = updateContactStatus;