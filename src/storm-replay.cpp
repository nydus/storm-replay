/*****************************************************************************/
/* storm-replay.cpp                          Copyright 2016 Justin J. Novack */
/*---------------------------------------------------------------------------*/
/* Common functions to interface with StormLib                               */
/*****************************************************************************/

#include <nan.h>

#include <iostream>  // NOLINT(readability/streams)
#include <fstream>   // NOLINT(readability/streams)

#include "StormLib/src/StormLib.h"
#include "StormLib/src/StormCommon.h"
#include "StormLib/src/StormPort.h"

void extractFile(const Nan::FunctionCallbackInfo<v8::Value> & args) {
    Nan::HandleScope scope;

    HANDLE hArchive = NULL;
    HANDLE hFile = NULL;

    // Open the Archive
    bool bArchive = SFileOpenArchive(*v8::String::Utf8Value(args[0]->ToString()), 0, 0, &hArchive);

    if (bArchive) {
        // Read the File
        bool bFile = SFileOpenFileEx(hArchive, *v8::String::Utf8Value(args[1]->ToString()), 0, &hFile);

        if (bFile) {
            // Capture the file
            char  szBuffer[0x3FFFFF];
            DWORD dwBytes = 1;

            v8::MaybeLocal<v8::Object> buffer;

            while (dwBytes > 0) {
                SFileReadFile(hFile, szBuffer, sizeof(szBuffer), &dwBytes, NULL);
                if (dwBytes > 0) {
                    buffer = Nan::CopyBuffer(szBuffer, dwBytes);
                }
            }

            SFileCloseFile(hFile);

            if (!buffer.IsEmpty()) {
                args.GetReturnValue().Set(buffer.ToLocalChecked());
            } else {
                args.GetReturnValue().Set(Nan::New<v8::Boolean>(false));
            }

        } else {
            args.GetReturnValue().Set(Nan::New<v8::Boolean>(bFile));
        }

    } else {
        args.GetReturnValue().Set(Nan::New<v8::Boolean>(bArchive));
    }
}

void getHeader(const Nan::FunctionCallbackInfo<v8::Value> & args) {
    Nan::HandleScope scope;

    // set up variables
    std::ifstream archive;

    // open the binary file
    archive.open(*v8::String::Utf8Value(args[0]->ToString()), std::ifstream::binary | std::ios::in);

    if (archive.is_open() == true) {
        // set up variables
        char * readBuffer;
        uint32_t userDataHeaderSize;

        // seek to the position of the size of the header
        archive.seekg(12);
        archive.read(reinterpret_cast<char *>(&userDataHeaderSize), sizeof(userDataHeaderSize));

        // Get back to the beginning of the file.
        archive.seekg(0);

        // create a readBuffer for entire header
        readBuffer = new char[16 + userDataHeaderSize + 1];

        // read entire header from the file
        archive.read(readBuffer, 16 + userDataHeaderSize);

        // append the null byte to terminate the string
        readBuffer[16 + userDataHeaderSize] = '\0';

        // DEBUG
        // for (uint32_t i = 0; i < 16 + userDataHeaderSize; i++) {
        //    printf("readBuffer[%d] is %X\n", i, static_cast<unsigned char>(readBuffer[i]));
        // }

        // Copy the readDuffer to a buffer that will be garbage collected by v8.
        v8::MaybeLocal<v8::Object> buffer = Nan::CopyBuffer(readBuffer, 16 + userDataHeaderSize);

        // Garbage cleanup.
        delete[] readBuffer;
        archive.close();

        // Return buffer
        args.GetReturnValue().Set(buffer.ToLocalChecked());
        return;
    }

    // File was closed, return false
    args.GetReturnValue().Set(Nan::New<v8::Boolean>(false));
}

void init(v8::Handle<v8::Object> exports) {
    Nan::Export(exports, "extractFile", extractFile);
    Nan::Export(exports, "getHeader", getHeader);
}

NODE_MODULE(StormLib, init);
