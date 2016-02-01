#include <nan.h>

#include "StormLib/src/StormLib.h"
#include "StormLib/src/StormCommon.h"
#include "StormLib/src/StormPort.h"

void get(const Nan::FunctionCallbackInfo<v8::Value> & args) {
    Nan::HandleScope scope;
    // v8::Isolate* isolate = args.GetIsolate();

    HANDLE hArchive = NULL;
    HANDLE hFile = NULL;

    // Open the Archive
    bool bArchive = SFileOpenArchive(*v8::String::Utf8Value(args[0]->ToString()), 0, 0, &hArchive);

    if (bArchive) {

        // Read the File
        bool bFile = SFileOpenFileEx(hArchive, *v8::String::Utf8Value(args[1]->ToString()), 0, &hFile);

        if (bFile) {

            // Capture the file
            char  szBuffer[0xF0000];
            DWORD dwBytes = 1;

            v8::MaybeLocal<v8::Object> buffer;

            while(dwBytes > 0)
            {
                SFileReadFile(hFile, szBuffer, sizeof(szBuffer), &dwBytes, NULL);
                if(dwBytes > 0) {
                    buffer = Nan::CopyBuffer(szBuffer, dwBytes);
                }
            }

            args.GetReturnValue().Set(buffer.ToLocalChecked());

/*
            // Capture the file
            char  inBuffer[0xF0000];
            char  outBuffer[0xF0000];
            int   outLength;
            DWORD dwBytes = 1;

            v8::MaybeLocal<v8::Object> buffer;

            while(dwBytes > 0)
            {
                SFileReadFile(hFile, inBuffer, sizeof(inBuffer), &dwBytes, NULL);
                if(dwBytes > 0) {
                    bool bExplode = SCompExplode(outBuffer, &outLength, inBuffer, dwBytes);
                    buffer = Nan::CopyBuffer(outBuffer, outLength);
                }
            }
*/


        } else {
            args.GetReturnValue().Set(Nan::New<v8::Boolean>(bFile));
        }

    } else {
        args.GetReturnValue().Set(Nan::New<v8::Boolean>(bArchive));
    }

}

void init(v8::Handle<v8::Object> exports) {
    Nan::Export(exports, "get", get);
}

NODE_MODULE(StormLib, init);
