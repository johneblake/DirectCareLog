const BetterSqlite3 = require('better-sqlite3');

class DirectCareLogDB {
  // @ts-ignore
  db;
  database;
  getScheduleStmt;
  updateScheduleStmt;

  // @ts-ignore
  constructor(database) {
    this.database = database;
    this.database.exec(
      'CREATE TABLE IF NOT EXISTS schedule(id INTEGER NOT NULL PRIMARY KEY, data TEXT)',
    );
    this.getScheduleStmt = this.database.prepare('SELECT data FROM schedule WHERE id=1');
    this.updateScheduleStmt = this.database.prepare(
      'INSERT INTO schedule (id, data) VALUES (1, @data) ON CONFLICT(id) DO UPDATE SET data=@data;',
    );
  }

  getSchedule() {
    const schedule = this.getScheduleStmt.get();
    // @ts-ignore
    return schedule ? JSON.parse(schedule.data) : undefined;
  }

  // @ts-ignore
  updateSchedule(schedule) {
    this.updateScheduleStmt.run({ data: JSON.stringify(schedule) });
  }

}

function getInstance() {
  // @ts-ignore
  if (!DirectCareLogDB.db) {
    // @ts-ignore
    DirectCareLogDB.db = new DirectCareLogDB(new BetterSqlite3('schedule.sqlite'));
  }
  // @ts-ignore
  return DirectCareLogDB.db;
}

module.exports.getInstance = getInstance;
