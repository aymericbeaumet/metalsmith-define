const path = require('path');
const test = require('ava');
const metalsmith = require('metalsmith');
const metalsmithDefine = require('.');

const fixtureDir = path.resolve(__dirname, 'fixture');

test.cb(
	'metalsmith-define should add a new key to the metadata with the given value',
	t => {
		t.plan(2);
		const object = {key: 'value'};
		metalsmith(fixtureDir)
			.use(metalsmithDefine(object))
			.use((_files, metalsmith, done) => {
				const metadata = metalsmith.metadata();
				t.is(metadata.key, 'value');
				return done();
			})
			.build(error => {
				t.falsy(error);
				t.end();
			});
	}
);

test.cb('metalsmith-define should support defining several keys at once', t => {
	t.plan(3);
	const object = {key1: 'value1', key2: 'value2'};
	metalsmith(fixtureDir)
		.use(metalsmithDefine(object))
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			t.is(metadata.key1, 'value1');
			t.is(metadata.key2, 'value2');
			return done();
		})
		.build(error => {
			t.falsy(error);
			t.end();
		});
});

test.cb('metalsmith-define should override any existing key', t => {
	t.plan(2);
	const object1 = {key: 'value1'};
	const object2 = {key: 'value2'};
	metalsmith(fixtureDir)
		.use(metalsmithDefine(object1))
		.use(metalsmithDefine(object2))
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			t.is(metadata.key, 'value2');
			return done();
		})
		.build(error => {
			t.falsy(error);
			t.end();
		});
});

test.cb('metalsmith-define should define nothing by default', t => {
	t.plan(2);
	let length;
	metalsmith(fixtureDir)
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			length = Object.keys(metadata).length;
			return done();
		})
		.use(metalsmithDefine())
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			t.is(Object.keys(metadata).length, length);
			return done();
		})
		.build(error => {
			t.falsy(error);
			t.end();
		});
});

test.cb('metalsmith-define should support arrays', t => {
	t.plan(3);
	const array = ['a', 'b'];
	metalsmith(fixtureDir)
		.use(metalsmithDefine(array))
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			t.is(metadata['0'], 'a');
			t.is(metadata['1'], 'b');
			return done();
		})
		.build(error => {
			t.falsy(error);
			t.end();
		});
});

test.cb('metalsmith-define should support class instance', t => {
	t.plan(3);
	const instance = new (class {
		constructor() {
			this.foo = 'bar';
			this.bar = 'foo';
		}
	})();
	metalsmith(fixtureDir)
		.use(metalsmithDefine(instance))
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			t.is(metadata.foo, 'bar');
			t.is(metadata.bar, 'foo');
			return done();
		})
		.build(error => {
			t.falsy(error);
			t.end();
		});
});

test.cb('metalsmith-define should support maps', t => {
	t.plan(3);
	const map = new Map([['foo', 'bar'], ['bar', 'foo']]);
	metalsmith(fixtureDir)
		.use(metalsmithDefine(map))
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			t.is(metadata.foo, 'bar');
			t.is(metadata.bar, 'foo');
			return done();
		})
		.build(error => {
			t.falsy(error);
			t.end();
		});
});

test.cb('metalsmith-define should support strings', t => {
	t.plan(4);
	const string = 'foo';
	metalsmith(fixtureDir)
		.use(metalsmithDefine(string))
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			t.is(metadata['0'], 'f');
			t.is(metadata['1'], 'o');
			t.is(metadata['2'], 'o');
			return done();
		})
		.build(error => {
			t.falsy(error);
			t.end();
		});
});

test.cb('metalsmith-define should support classes', t => {
	t.plan(3);
	const c = class {};
	c.foo = 'bar';
	c.bar = 'foo';
	metalsmith(fixtureDir)
		.use(metalsmithDefine(c))
		.use((_files, metalsmith, done) => {
			const metadata = metalsmith.metadata();
			t.is(metadata.foo, 'bar');
			t.is(metadata.bar, 'foo');
			return done();
		})
		.build(error => {
			t.falsy(error);
			t.end();
		});
});

test.cb(
	'metalsmith-define should detect and call the correct entries method (from the prototype)',
	t => {
		t.plan(3);
		const map = new Map([['foo', 'bar'], ['bar', 'foo']]);
		map.entries = () => {
			throw new Error('Gotcha!');
		};

		metalsmith(fixtureDir)
			.use(metalsmithDefine(map))
			.use((_files, metalsmith, done) => {
				const metadata = metalsmith.metadata();
				t.is(metadata.foo, 'bar');
				t.is(metadata.bar, 'foo');
				return done();
			})
			.build(error => {
				t.falsy(error);
				t.end();
			});
	}
);
