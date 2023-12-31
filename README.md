# US Visa appointment date checker(Canada only)

The script automates the visa appointment checking.

Note: This tool can only be used for checking the US visa appointment in US Canada consulates.

## Status of the project

This is not a scalable/maintainable solution since it has been built in a very short time-frame. It is for personal use only!

## Environment

Linux/MacOS + NodeJS v18.14.1

If you don't have NodeJS environment, install it through: https://nodejs.org/en/

## env Variables

Create a copy of .envexample with name .env and update your information

## Install dependency

Run the command

```
pnpm install
```

## Run script

Once you start the script, it will check the appointment every 10 minutes (don't recommend to change since your account could be blocked if you check too often)

```
pnpm checkdate
```

To quit the script, press `Control+C`

## License

The MIT License (MIT)

Copyright (c) 2024 Devashish Patel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
