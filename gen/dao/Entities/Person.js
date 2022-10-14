const query = require("db/v4/query");
const producer = require("messaging/v4/producer");
const daoApi = require("db/v4/dao");

let dao = daoApi.create({
	table: "poc_PERSON",
	properties: [
		{
			name: "Id",
			column: "PERSON_ID",
			type: "INTEGER",
			id: true,
			autoIncrement: true,
		},
 {
			name: "name",
			column: "PERSON_NAME",
			type: "VARCHAR",
		},
 {
			name: "lastname",
			column: "PERSON_LASTNAME",
			type: "VARCHAR",
		},
 {
			name: "citiid",
			column: "PERSON_CITIID",
			type: "INTEGER",
		}
]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	let id = dao.insert(entity);
	triggerEvent("Create", {
		table: "poc_PERSON",
		key: {
			name: "Id",
			column: "PERSON_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "poc_PERSON",
		key: {
			name: "Id",
			column: "PERSON_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "poc_PERSON",
		key: {
			name: "Id",
			column: "PERSON_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	let resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PERSON");
	if (resultSet !== null && resultSet[0] !== null) {
		if (resultSet[0].COUNT !== undefined && resultSet[0].COUNT !== null) {
			return resultSet[0].COUNT;
		} else if (resultSet[0].count !== undefined && resultSet[0].count !== null) {
			return resultSet[0].count;
		}
	}
	return 0;
};

function triggerEvent(operation, data) {
	producer.queue("poc/Entities/Person/" + operation).send(JSON.stringify(data));
}