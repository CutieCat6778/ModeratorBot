module.exports = (value) => {
    if (typeof (value) == "string") {
        if (value.startsWith("<") && value.endsWith(">")) {
            value = value.slice(2, -1);
            if (value.includes("@")) {
                if (value.startsWith('!')) {
                    value = value.slice(1);
                }
                return value;
            } else if (value.startsWith('&')) {
                value = value.slice(1);
                return value;
            } else if (value.includes("#")) {
                return value;
            } else {
                return undefined;
            }
        } else {
            if (isNaN(value) == false) {
                return value.toString();
            } else if (isNaN(value) == true) {
                return undefined;
            } else {
                return undefined;
            }
        }
    } else if (typeof (value) == "object") {
        let list = []
        value.forEach(v => {
            if (v.startsWith("<") && v.endsWith(">")) {
                v = v.slice(2, -1);
                if (v.includes("@")) {
                    if (v.startsWith('!')) {
                        v = v.slice(1);
                    }
                    list.push(v);
                } else if (v.startsWith('&')) {
                    v = v.slice(1);
                    list.push(v);
                } else if (v.includes("#")) {
                    list.push(v);
                } else {
                    return undefined;
                }
            } else {
                if (isNaN(v) == false) {
                    list.push(v);
                } else if (isNaN(v) == true) {
                    return undefined;
                } else {
                    return undefined;
                }
            }
        })
        return list;
    } else {
        return undefined;
    }

}