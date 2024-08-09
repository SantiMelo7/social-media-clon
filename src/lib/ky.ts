import ky from "ky"

const kyInstance = ky.create({
    parseJson: (text) =>
        JSON.parse(text, (key, value) => {
            if (key.endsWith("Ad")) return new Date(value)
            return value
        })
})

export default kyInstance