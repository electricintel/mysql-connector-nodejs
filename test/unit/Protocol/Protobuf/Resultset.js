'use strict';

/* eslint-env node, mocha */

const BinaryWriter = require('google-protobuf').BinaryWriter;
const ColumnMetaDataStub = require('../../../../lib/Protocol/Protobuf/Stubs/mysqlx_resultset_pb').ColumnMetaData;
const ContentType = require('../../../../lib/Protocol/Protobuf/Stubs/mysqlx_resultset_pb').ContentType_BYTES;
const Resultset = require('../../../../lib/Protocol/Protobuf/Adapters/Resultset');
const Row = require('../../../../lib/Protocol/Protobuf/Stubs/mysqlx_resultset_pb').Row;
const columnMetadata = require('../../../../lib/Protocol/Types/ColumnMetadata');
const expect = require('chai').expect;

context('Protobuf Mysqlx.Resultset Adapter', () => {
    context('decodeRow()', () => {
        it('decodes float values into JavaScript numbers', () => {
            const proto = new ColumnMetaDataStub();
            proto.setType(ColumnMetaDataStub.FieldType.FLOAT);
            proto.setFractionalDigits(2);

            const writer = new BinaryWriter();
            writer.writeFloat(1, 1.2345);

            const row = new Row();
            // remove length field
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            const data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([1.23]);
        });

        it('decodes double values into JavaScript numbers', () => {
            const proto = new ColumnMetaDataStub();
            proto.setType(ColumnMetaDataStub.FieldType.DOUBLE);
            proto.setFractionalDigits(1);

            const writer = new BinaryWriter();
            writer.writeDouble(1, 1.2345678910111213);

            const row = new Row();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            const data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([1.2]);
        });

        it('decodes signed integer values into JavaScript numbers', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.SINT]);

            const writer = new BinaryWriter();
            writer.writeSint64(1, 1);

            const row = new Row();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([1]);

            writer.reset();
            writer.writeSint64(1, -1);
            row.clearFieldList();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([-1]);

            let overflow = Number.MAX_SAFE_INTEGER + 1;

            writer.reset();
            writer.writeSint64(1, overflow);
            row.clearFieldList();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([overflow.toString()]);

            overflow = Number.MIN_SAFE_INTEGER - 1;

            writer.reset();
            writer.writeSint64(1, overflow);
            row.clearFieldList();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([overflow.toString()]);
        });

        it('decodes unsigned integer values into JavaScript numbers', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.UINT]);

            const writer = new BinaryWriter();
            writer.writeUint64(1, 1);

            const row = new Row();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([1]);

            writer.reset();
            writer.writeUint64(1, 0);
            row.clearFieldList();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([0]);

            const overflow = Number.MAX_SAFE_INTEGER + 1;

            writer.reset();
            writer.writeUint64(1, overflow);
            row.clearFieldList();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([overflow.toString()]);

            proto.setLength(5);
            proto.setFlags(1);

            writer.reset();
            writer.writeUint64(1, 82);
            row.clearFieldList();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['00082']);
        });

        it('decodes bit sequence values into Node.js buffers', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.BIT]);

            let writer = new BinaryWriter();
            writer.writeUint64(1, 23);

            const row = new Row();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['23']);

            const overflow = Number.MAX_SAFE_INTEGER + 1;

            writer.reset();
            writer.writeUint64(1, overflow);

            row.clearFieldList();
            row.addField(writer.getResultBuffer().slice(1));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([overflow.toString()]);
        });

        it('decodes binary data values into Node.js buffers', () => {
            // eslint-disable-next-line node/no-deprecated-api
            const binary = new Buffer('foo\0');
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.BYTES]);
            proto.setCollation(63); // binary charset and collation

            const row = new Row();
            row.addField(new Uint8Array(binary));

            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([binary.slice(0, -1)]);

            proto.setLength(5);
            proto.clearFlags(); // without right-padding

            row.clearFieldList();
            row.addField(new Uint8Array(binary));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([binary.slice(0, -1)]);

            // with right-padding but invalid length
            proto.setLength(2);
            proto.setFlags(1);

            row.clearFieldList();
            row.addField(new Uint8Array(binary));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            // remove the additional `0x00` bytes
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([binary.slice(0, -1)]);

            // with right-padding
            proto.setLength(5);
            proto.setFlags(1);

            row.clearFieldList();
            row.addField(new Uint8Array(binary));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            // remove the additional `0x00` bytes
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })[0].slice(0, -2)).to.deep.equal(binary.slice(0, -1));
        });

        it('decodes GEOMETRY data values into Node.js buffers', () => {
            // eslint-disable-next-line node/no-deprecated-api
            const binary = new Buffer('foo\0');
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.BYTES]);
            proto.setContentType(ContentType.GEOMETRY);

            const row = new Row();
            row.addField(new Uint8Array(binary));

            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([binary.slice(0, -1)]);

            // without right-padding
            proto.setLength(5);
            proto.clearFlags();

            row.clearFieldList();
            row.addField(new Uint8Array(binary));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([binary.slice(0, -1)]);

            // with right-padding but invalid length
            proto.setLength(2);
            proto.setFlags(1);

            row.clearFieldList();
            row.addField(new Uint8Array(binary));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            // remove the additional `0x00` bytes
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([binary.slice(0, -1)]);

            // with right-padding
            proto.setLength(5);
            proto.setFlags(1);

            row.clearFieldList();
            row.addField(new Uint8Array(binary));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            // remove the additional `0x00` bytes
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })[0].slice(0, -2)).to.deep.equal(binary.slice(0, -1));
        });

        it('decodes JSON data values into JavaScript objects', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.BYTES]);
            proto.setContentType(ContentType.JSON);

            const obj = { foo: 'bar' };

            const row = new Row();
            // eslint-disable-next-line node/no-deprecated-api
            row.addField(new Uint8Array(new Buffer(`${JSON.stringify(obj)}\0`)));
            // eslint-disable-next-line node/no-deprecated-api
            const data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([obj]);
        });

        it('decodes XML data values into JavaScript strings', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.BYTES]);
            proto.setContentType(ContentType.XML);

            const xml = '<?xml version="1.0" encoding="UTF-8"?><text><para>foo</para></text>';

            const row = new Row();
            // eslint-disable-next-line node/no-deprecated-api
            row.addField(new Uint8Array(new Buffer(`${xml}\0`)));
            // eslint-disable-next-line node/no-deprecated-api
            const data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([xml]);
        });

        it('decodes text values into JavaScript strings', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.BYTES]);

            const row = new Row();
            // eslint-disable-next-line node/no-deprecated-api
            row.addField(new Uint8Array(new Buffer('foo\0')));
            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['foo']);

            // without right-padding
            proto.setLength(5);
            proto.clearFlags();

            row.clearFieldList();
            // eslint-disable-next-line node/no-deprecated-api
            row.addField(new Uint8Array(new Buffer('foo\0')));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['foo']);

            row.clearFieldList();
            // eslint-disable-next-line node/no-deprecated-api
            row.addField(new Uint8Array(new Buffer('\0')));

            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['']);

            // with right-padding but invalid length
            proto.setLength(2);
            proto.setFlags(1);

            row.clearFieldList();
            // eslint-disable-next-line node/no-deprecated-api
            row.addField(new Uint8Array(new Buffer('foo\0')));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['foo']);

            // with right-padding
            proto.setLength(5);
            proto.setFlags(1);

            row.clearFieldList();
            // eslint-disable-next-line node/no-deprecated-api
            row.addField(new Uint8Array(new Buffer('foo\0')));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['foo  ']);
        });

        it('decodes NULL values', () => {
            const proto = new ColumnMetaDataStub(); // any type

            const row = new Row();
            row.addField(new Uint8Array());

            // eslint-disable-next-line node/no-deprecated-api
            const data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([null]);
        });

        it('decodes enum values into JavaScript strings', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.ENUM]);

            const row = new Row();
            // eslint-disable-next-line node/no-deprecated-api
            row.addField(new Uint8Array(new Buffer('foo\0')));
            // eslint-disable-next-line node/no-deprecated-api
            const data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['foo']);
        });

        it('decodes time values into JavaScript strings', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.TIME]);

            // eslint-disable-next-line node/no-deprecated-api
            let time = new Buffer(2);
            time.fill(0);
            time.writeUInt8(22, 1);

            const row = new Row();
            row.addField(new Uint8Array(time));
            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['+22:00:00.000000']);

            // eslint-disable-next-line node/no-deprecated-api
            time = new Buffer(2);
            time.fill(1);
            time.writeUInt8(5, 1);

            row.clearFieldList();
            row.addField(new Uint8Array(time));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['-05:00:00.000000']);

            // eslint-disable-next-line node/no-deprecated-api
            time = new Buffer(3);
            time.fill(1);
            time.writeUInt8(14, 1);
            time.writeUInt8(47, 2);

            row.clearFieldList();
            row.addField(new Uint8Array(time));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['-14:47:00.000000']);

            // eslint-disable-next-line node/no-deprecated-api
            time = new Buffer(4);
            time.fill(0);
            time.writeUInt8(8, 1);
            time.writeUInt8(8, 2);
            time.writeUInt8(8, 3);

            row.clearFieldList();
            row.addField(new Uint8Array(time));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['+08:08:08.000000']);

            // eslint-disable-next-line node/no-deprecated-api
            time = new Buffer(4);
            time.fill(1);
            time.writeUInt8(20, 1);
            time.writeUInt8(17, 2);
            time.writeUInt8(54, 3);

            const writer = new BinaryWriter();
            writer.writeUint64(1, 999999);
            // eslint-disable-next-line node/no-deprecated-api
            let useconds = new Buffer(writer.getResultBuffer().slice(1));

            row.clearFieldList();
            row.addField(new Uint8Array(Buffer.concat([time, useconds], time.length + useconds.length)));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal(['-20:17:54.999999']);
        });

        it('decodes datetime values into JavaScript dates', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.DATETIME]);

            const writer = new BinaryWriter();
            writer.writeUint64(1, 9999);

            // eslint-disable-next-line node/no-deprecated-api
            let year = new Buffer(writer.getResultBuffer().slice(1));
            // eslint-disable-next-line node/no-deprecated-api
            let dayAndMonth = new Buffer(2);
            dayAndMonth.writeUInt8(12);
            dayAndMonth.writeUInt8(25, 1);

            let datetime = Buffer.concat([year, dayAndMonth], year.length + dayAndMonth.length);

            const row = new Row();
            row.addField(new Uint8Array(datetime));
            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([new Date('9999-12-25')]);

            writer.reset();
            writer.writeUint64(1, 2018);

            // eslint-disable-next-line node/no-deprecated-api
            year = new Buffer(writer.getResultBuffer().slice(1));
            // eslint-disable-next-line node/no-deprecated-api
            dayAndMonth = new Buffer(2);
            dayAndMonth.writeUInt8(2);
            dayAndMonth.writeUInt8(19, 1);

            // works with additional time data as well

            // eslint-disable-next-line node/no-deprecated-api
            const hourAndMinute = new Buffer(2);
            hourAndMinute.writeUInt8(15);
            hourAndMinute.writeUInt8(9, 1);

            datetime = Buffer.concat([year, dayAndMonth, hourAndMinute], year.length + dayAndMonth.length + hourAndMinute.length);

            row.clearFieldList();
            row.addField(new Uint8Array(datetime));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([new Date('2018-02-19T15:09:00.000Z')]);
        });

        it('decodes timestamp values into JavaScript numbers', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.DATETIME]);
            proto.setFlags(1);

            const writer = new BinaryWriter();
            writer.writeUint64(1, 2018);

            // eslint-disable-next-line node/no-deprecated-api
            const year = new Buffer(writer.getResultBuffer().slice(1));
            // eslint-disable-next-line node/no-deprecated-api
            const fromMonthToSeconds = new Buffer(5);
            fromMonthToSeconds.writeUInt8(2);
            fromMonthToSeconds.writeUInt8(19, 1);
            fromMonthToSeconds.writeUInt8(15, 2);
            fromMonthToSeconds.writeUInt8(21, 3);
            fromMonthToSeconds.writeUInt8(26, 4);

            writer.reset();
            writer.writeUint64(1, 123000);
            // eslint-disable-next-line node/no-deprecated-api
            const useconds = new Buffer(writer.getResultBuffer().slice(1));

            const datetime = Buffer.concat([year, fromMonthToSeconds, useconds], year.length + fromMonthToSeconds.length + useconds.length);

            const row = new Row();
            row.addField(new Uint8Array(datetime));
            // eslint-disable-next-line node/no-deprecated-api
            const data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([(new Date('2018-02-19T15:21:26.123Z')).getTime()]);
        });

        it('decodes decimal values into JavaScript numbers', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.DECIMAL]);

            // eslint-disable-next-line node/no-deprecated-api
            let decimal = new Buffer('04123401d0', 'hex');

            const row = new Row();
            row.addField(new Uint8Array(decimal));
            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([-12.3401]);

            let overflow = Number.MAX_SAFE_INTEGER + 1;
            let scale = 10; // overflow size in hexadecimal
            // eslint-disable-next-line node/no-deprecated-api
            decimal = new Buffer(`${scale}${overflow}${overflow}c0`, 'hex');

            row.clearFieldList();
            row.addField(new Uint8Array(decimal));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([`+${overflow}.${overflow}`]);
        });

        it('decodes set values into JavaScript arrays', () => {
            const proto = new ColumnMetaDataStub([ColumnMetaDataStub.FieldType.SET]);

            const row = new Row();
            row.addField(new Uint8Array());

            // eslint-disable-next-line node/no-deprecated-api
            let data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([null]);

            // eslint-disable-next-line node/no-deprecated-api
            let setDefinition = new Buffer('00', 'hex');

            row.clearFieldList();
            row.addField(new Uint8Array(setDefinition));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([['']]);

            // eslint-disable-next-line node/no-deprecated-api
            setDefinition = new Buffer('01', 'hex');

            row.clearFieldList();
            row.addField(new Uint8Array(setDefinition));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([[]]);

            // eslint-disable-next-line node/no-deprecated-api
            setDefinition = new Buffer('0100', 'hex');

            row.clearFieldList();
            row.addField(new Uint8Array(setDefinition));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([['\0']]);

            // eslint-disable-next-line node/no-deprecated-api
            const foo = (new Buffer('foo')).toString('hex');
            // eslint-disable-next-line node/no-deprecated-api
            const bar = (new Buffer('bar')).toString('hex');
            // eslint-disable-next-line node/no-deprecated-api
            setDefinition = new Buffer(`03${foo}03${bar}`, 'hex');

            row.clearFieldList();
            row.addField(new Uint8Array(setDefinition));
            // eslint-disable-next-line node/no-deprecated-api
            data = new Buffer(row.serializeBinary());
            expect(Resultset.decodeRow(data, { metadata: [columnMetadata(proto)] })).to.deep.equal([['foo', 'bar']]);
        });
    });
});
