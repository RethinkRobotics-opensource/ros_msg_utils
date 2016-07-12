/*
 *    Copyright 2016 Rethink Robotics
 *
 *    Copyright 2016 Chris Smith
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

'use strict'

//-----------------------------------------------------------------------------
// Base Type Serializer Functions
//-----------------------------------------------------------------------------

function DefaultArraySerializer(serializeFunc, array, buffer, bufferOffset) {
  for (let i = 0; i < array.length; ++i) {
    bufferOffset = serializeFunc(array[i], buffer, bufferOffset, false);
  }

  return bufferOffset;
}

function StringSerializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(StringSerializer, value, buffer, bufferOffset);
  }

  let len = value.length;
  buffer.writeUInt32LE(len, bufferOffset);
  bufferOffset += 4;
  buffer.write(value, bufferOffset, 'ascii');
  return bufferOffset + len;
}

function UInt8Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(UInt8Serializer, value, buffer, bufferOffset);
  }

  buffer.writeUInt8(value, bufferOffset, true);
  return bufferOffset + 1;
}

function UInt16Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(UInt16Serializer, value, buffer, bufferOffset);
  }

  buffer.writeUInt16LE(value, bufferOffset);
  return bufferOffset + 2;
}

function UInt32Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(UInt32Serializer, value, buffer, bufferOffset);
  }

  buffer.writeUInt32LE(value, bufferOffset);
  return bufferOffset + 4;
}

function UInt64Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(UInt64Serializer, value, buffer, bufferOffset);
  }

  // FIXME: best way to do this??
  if (!(value instanceof Buffer) || value.length !== 8) {
    throw new Error('Unable to serialize Uint64 - must be 8 byte buffer');
  }
  buffer.write(value.toString(), bufferOffset);
  return bufferOffset + 8;
}

function Int8Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(Int8Serializer, value, buffer, bufferOffset);
  }

  buffer.writeInt8(value, bufferOffset);
  return bufferOffset + 1;
}

function Int16Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(Int16Serializer, value, buffer, bufferOffset);
  }

  buffer.writeInt16LE(value, bufferOffset);
  return bufferOffset + 2;
}

function Int32Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(Int32Serializer, value, buffer, bufferOffset);
  }

  buffer.writeInt32LE(value, bufferOffset);
  return bufferOffset + 4;
}

function Int64Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(Int64Serializer, value, buffer, bufferOffset);
  }

  // FIXME: best way to do this??
  if (!(value instanceof Buffer) || value.length !== 8) {
    throw new Error('Unable to serialize Uint64 - must be 8 byte buffer');
  }
  buffer.write(value.toString(), bufferOffset);
  return bufferOffset + 8;
}

function Float32Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(Float32Serializer, value, buffer, bufferOffset);
  }

  buffer.writeFloatLE(value, bufferOffset);
  return bufferOffset + 4;
}

function Float64Serializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(Float64Serializer, value, buffer, bufferOffset);
  }

  buffer.writeDoubleLE(value, bufferOffset);
  return bufferOffset + 8;
}

function TimeSerializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(TimeSerializer, value, buffer, bufferOffset);
  }

  buffer.writeInt32LE(value.secs, bufferOffset);
  buffer.writeInt32LE(value.nsecs, bufferOffset+4);
  return bufferOffset + 8;
}

function BoolSerializer(value, buffer, bufferOffset, isArray) {
  if (isArray) {
    return DefaultArraySerializer(BoolSerializer, value, buffer, bufferOffset);
  }

  return Int8Serializer(value ? 1 : 0, buffer, bufferOffset);
}

//-----------------------------------------------------------------------------

module.exports = {
  ArraySerializer: DefaultArraySerializer,
  string: StringSerializer,
  float32: Float32Serializer,
  float64: Float64Serializer,
  bool: BoolSerializer,
  int8: Int8Serializer,
  int16: Int16Serializer,
  int32: Int32Serializer,
  int64: Int64Serializer,
  uint8: UInt8Serializer,
  uint16: UInt16Serializer,
  uint32: UInt32Serializer,
  uint64: UInt64Serializer,
  char: UInt8Serializer,
  byte: Int8Serializer,
  time: TimeSerializer,
  duration: TimeSerializer
};
