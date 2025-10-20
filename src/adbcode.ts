type Mode = "adb" | "zj";

function v1(code: string, mode: Mode): string {
    try {
        if (mode === "adb") {
            const i1 = parseInt(code.substring(0, 2));
            const i2 = parseInt(code.substring(2, 4));
            const i3 = parseInt(code.substring(4, 6));
            const i4 = parseInt(code.substring(6, 8));
            const i5 = parseInt(code.substring(8));

            const i6 = i5 ^ (i3 + i4);
            const i7 = i4 ^ i6;
            const i8 = i3 ^ i6;
            const i9 = i1 ^ i6;
            const i10 = i2 ^ i6;

            let i = "";
            for (const x of [i9, i10, i8, i7, i6]) {
                if (x.toString().length === 1) {
                    i += "0" + x.toString();
                } else {
                    i += x.toString();
                }
            }

            const i1_2 = parseInt(i.substring(0, 2));
            const i2_2 = parseInt(i.substring(2, 4));
            const i3_2 = parseInt(i.substring(4, 6));
            const i4_2 = parseInt(i.substring(6, 8));
            const i5_2 = parseInt(i.substring(8));

            const i6_2 = i4_2 ^ i3_2;
            const i7_2 = i5_2 ^ i3_2;
            const i8_2 = i3_2 ^ (i6_2 + i7_2);
            const i9_2 = i1_2 ^ i7_2;
            const i10_2 = i2_2 ^ i7_2;

            let i2_result = "";
            for (const x of [i9_2, i10_2, i6_2, i7_2, i8_2]) {
                if (x.toString().length === 1) {
                    i2_result += "0" + x.toString();
                } else {
                    i2_result += x.toString();
                }
            }

            return i2_result;
        } else if (mode === "zj") {
            const i1 = parseInt(code.substring(0, 2));
            const i2 = parseInt(code.substring(2, 4));
            const i3 = parseInt(code.substring(4));

            const i5 = i3 ^ (i1 + i2);
            const i6 = i1 ^ i5;
            const i4 = i2 ^ i5;

            let i = "";
            for (const x of [i6, i4, i5]) {
                if (x.toString().length === 1) {
                    i += "0" + x.toString();
                } else {
                    i += x.toString();
                }
            }

            const i1_2 = parseInt(i.substring(0, 2));
            const i2_2 = parseInt(i.substring(2, 4));
            const i3_2 = parseInt(i.substring(4));

            const i5_2 = i2_2 ^ i1_2;
            const i6_2 = i3_2 ^ i1_2;
            const i4_2 = i1_2 ^ (i5_2 + i6_2);

            let i2_result = "";
            for (const x of [i5_2, i6_2, i4_2]) {
                if (x.toString().length === 1) {
                    i2_result += "0" + x.toString();
                } else {
                    i2_result += x.toString();
                }
            }

            return i2_result;
        }
    } catch (error) {
        return "";
    }
    return "";
}

function v2(code: string, mode: Mode): string {
    try {
        let num: number;
        if (mode === "adb") {
            num = 2;
        } else {
            num = 1;
        }

        if (/^\d+$/.test(code)) {
            const key = parseInt(code[7]) ^ num;
            const v7 = (parseInt(code[key]) - key + 10) % 10;
            let result1 = "";
            for (let i = 0; i < 7; i++) {
                const curKey = v7;
                if (i === key) {
                    result1 += v7.toString();
                } else {
                    const curInt = parseInt(code[i]);
                    result1 += ((curInt + 10 - curKey) % 10).toString();
                }
            }

            const keyId = Math.floor(Math.random() * 7);
            const keyValue = parseInt(result1[keyId]);
            let result = "";
            for (let i = 0; i < 7; i++) {
                const curKey = i === keyId ? keyId : keyValue;
                const curInt = parseInt(result1[i]);
                result += ((curInt + curKey) % 10).toString();
            }
            result += (num ^ keyId).toString();
            return result;
        } else {
            return "";
        }
    } catch (error) {
        return "";
    }
}

export function getCode(code: string, mode: Mode): string {
    if (code.length === 8) {
        let result: string | null = null;
        while (true) {
            result = v2(code, mode);
            if (result != null && result != code) {
                break;
            }
        }
        return result;
    } else {
        return v1(code, mode);
    }
}
