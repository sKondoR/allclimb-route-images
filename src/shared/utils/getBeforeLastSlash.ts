export const getBeforeLastSlash = (text?: string) => {
    return text?.substring(0, text.lastIndexOf('/'));
};