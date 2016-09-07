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
// Base Type Deserializer Functions
//-----------------------------------------------------------------------------

function DefaultArrayDeserializer(deserializeFunc, buffer, bufferOffset, array) {
  for (let i = 0; i < array.length; ++i) {
    array[i] = deserializeFunc(buffer, bufferOffset, null);
  }
  return array;
}

function StringDeserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(StringDeserializer, buffer, bufferOffset, array);
  }

  let len = buffer.readUInt32LE(bufferOffset[0]);
  //console.log('len ' + len);
  bufferOffset[0] += 4;
  let str = buffer.slice(bufferOffset[0], bufferOffset[0] + len).toString();
  bufferOffset[0] += len;
  return str;
}

function UInt8Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(UInt8Deserializer, buffer, bufferOffset, array);
  }

  let val = buffer.readUInt8(bufferOffset[0], true);
  bufferOffset[0] += 1;
  return val;
}

function UInt16Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(UInt16Deserializer, buffer, bufferOffset, array);
  }

  let val = buffer.readUInt16LE(bufferOffset[0], true);
  bufferOffset[0] += 2;
  return val;
}

function UInt32Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(UInt32Deserializer, buffer, bufferOffset, array);
  }

  let val = buffer.readUInt32LE(bufferOffset[0]);
  bufferOffset[0] += 4;
  return val;
}

function UInt64Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(UInt64Deserializer, buffer, bufferOffset, array);
  }

  // FIXME: best way to do this??
  let val = buffer.slice(bufferOffset[0], bufferOffset[0] + 8)
  bufferOffset[0] += 8;
  return val;
}

function Int8Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(Int8Deserializer, buffer, bufferOffset, array);
  }

  let val = buffer.readInt8(bufferOffset[0], true);
  bufferOffset[0] += 1;
  return val;
}

function Int16Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(Int16Deserializer, buffer, bufferOffset, array);
  }

  let val = buffer.readInt16LE(bufferOffset[0], true);
  bufferOffset[0] += 2;
  return val;
}

function Int32Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(Int32Deserializer, buffer, bufferOffset, array);
  }

  let val = buffer.readInt32LE(bufferOffset[0], true);
  bufferOffset[0] += 4;
  return val;
}

function Int64Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(Int64Deserializer, buffer, bufferOffset, array);
  }

  // FIXME: best way to do this??
  let val = buffer.slice(bufferOffset[0], bufferOffset[0] + 8);
  bufferOffset[0] += 8;
  return val;
}

function Float32Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(Float32Deserializer, buffer, bufferOffset, array);
  }

  let val = buffer.readFloatLE(bufferOffset[0], true);
  bufferOffset[0] += 4;
  return val;
}

function Float64Deserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(Float64Deserializer, buffer, bufferOffset, array);
  }

  let val = buffer.readDoubleLE(bufferOffset[0], true);
  bufferOffset[0] += 8;
  return val;
}

function TimeDeserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(TimeDeserializer, buffer, bufferOffset, array);
  }

  let secs = Int32Deserializer(buffer, bufferOffset);
  let nsecs = Int32Deserializer(buffer, bufferOffset);
  return {secs: secs, nsecs: nsecs};
}

function BoolDeserializer(buffer, bufferOffset, array) {
  if (array) {
    return DefaultArrayDeserializer(BoolDeserializer, buffer, bufferOffset, array);
  }

  return !!Int8Deserializer(buffer, bufferOffset);
};

//-----------------------------------------------------------------------------

module.exports = {
  ArrayDeserializer: DefaultArrayDeserializer,
  string: StringDeserializer,
  float32: Float32Deserializer,
  float64: Float64Deserializer,
  bool: BoolDeserializer,
  int8: Int8Deserializer,
  int16: Int16Deserializer,
  int32: Int32Deserializer,
  int64: Int64Deserializer,
  uint8: UInt8Deserializer,
  uint16: UInt16Deserializer,
  uint32: UInt32Deserializer,
  uint64: UInt64Deserializer,
  char: UInt8Deserializer,
  byte: Int8Deserializer,
  time: TimeDeserializer,
  duration: TimeDeserializer
};
