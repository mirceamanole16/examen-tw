import Sequelize from "sequelize";

const sequelize = new Sequelize({
  storage: "./database.db",
  dialect: "sqlite",
  logging: false,
});

const Meeting = sequelize.define("Meeting", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        length: { minimum: 3 }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }
});

const Participant = sequelize.define("Participant", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        length: { minimum: 5 }
    }
});

Meeting.hasMany(Participant, { foreigKey: "meetingId" });
Participant.belongsTo(Meeting, { foreigKey: "meetingId" });

async function initialize() {
    await sequelize.authenticate();
    await sequelize.sync({});
  }

export { initialize, Meeting, Participant };