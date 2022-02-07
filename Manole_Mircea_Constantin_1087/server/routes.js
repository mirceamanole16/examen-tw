import express from "express";
import { Meeting, Participant } from "./entities.js";

const router = express.Router();

router
  .route("/participant")
  .post(async (req, res) => postRecords(Participant, req, res))
    .get(async (req, res) => getRecords(Participant, req, res))
  .delete(async (req, res) => deleteRecords(Participant, req, res));

router
  .route('/participant/sort')
  .get(async (req, res) => getRecordsSort(Participant, req, res))

router
.route('/participant/filter')
.get(async (req, res) => getRecordsFilter(Participant, req, res))

router
.route('/participant/pagination')
.get(async (req, res) => getRecordsPagination(Participant, req, res))

router
  .route("/participant/:id")
  .get(async (req, res) => getRecord(Participant, req, res))
  .delete(async (req, res) => deleteRecord(Participant, req, res))
  .put(async (req, res) => putRecord(Participant, req, res));

router
  .route("/participant/meeting/:id")
  .get(async (req, res) => getParticipanti(Participant, req, res));

router
  .route("/meeting")
  .post(async (req, res) => postRecords(Meeting, req, res))
  .get(async (req, res) => getRecords(Meeting, req, res))
  .delete(async (req, res) => deleteRecords(Meeting, req, res));

router
  .route("/meeting/:id")
  .get(async (req, res) => getRecord(Meeting, req, res))
  .delete(async (req, res) => deleteRecord(Meeting, req, res))
  .put(async (req, res) => putRecord(Meeting, req, res));

async function postRecords(Model, req, res) {
    try {
      let record = await Model.create(req.body);
      res
        .status(201)
        .location(
          `http://${req.headers.host}${req.baseUrl}${req.url}/${record.id}`
        )
        .send();
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  
  async function getRecords(Model, req, res) {
    try {
      let records = await Model.findAll();
      if (records.length > 0) {
        res.status(200).json(records);
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.log("error: " + error);
      res.status(500).json(error);
    }
  }

  async function getRecordsSort(Model, req, res) {
    try {
      let records = await Model.findAll({
        order: [
        ['name', 'ASC']
        ]
      });
      if (records.length > 0) {
        res.status(200).json(records);
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.log("error: " + error);
      res.status(500).json(error);
    }
  }

  async function getRecordsPagination(Model, req, res) {
    try {
      let records = await Model.findAll({
        offset: 1,
        limit: 4,
      });
      if (records.length > 0) {
        res.status(200).json(records);
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.log("error: " + error);
      res.status(500).json(error);
    }
  }

  async function getRecordsFilter(Model, req, res) {
    try {
      let records = await Model.findAll({
        where: {
          name: 'vasile'
        }
      });
      if (records.length > 0) {
        res.status(200).json(records);
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.log("error: " + error);
      res.status(500).json(error);
    }
  }
  
  async function deleteRecords(Model, req, res) {
    try {
      await Model.truncate();
      res.status(204).send();
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  async function getRecord(Model, req, res) {
    try {
      let record = await Model.findByPk(req.params.id);
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  async function getParticipanti(Model, req, res) {
    try {
      let record = await Model.findAll({
        where: { meetingId: req.params.id },
      });
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  async function putRecord(Model, req, res) {
    try {
      let record = await Model.findByPk(req.params.id);
      if (record) {
        await record.update(req.body);
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  async function deleteRecord(Model, req, res) {
    try {
      let record = await Model.findByPk(req.params.id);
      if (record) {
        await record.destroy();
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  export default router;