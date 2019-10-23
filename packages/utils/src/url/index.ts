const urlUtils = {
  /**
   * 通过url或带后缀的文件名称获取文件类型
   */
  getFileType(name = '') {
    const fileType = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
    return fileType;
  },

  /**
   * 判断文件后缀是否是支持预览
   */
  isSupportPreview(name = '') {
    return /(ppt|pptx|xls|xlsx|xlsm|xlt|xltx|xltm|csv|doc|docx|docm|dot|dotx|dotm|pdf|jpg|jpeg|png|gif|bmp|txt)/.test(
      this.getFileType(name),
    );
  },

  /**
   * 判断url或文件名称是否是图片类型
   */
  isImg(name = '') {
    const fileType = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
    return /(png|jpg|jpeg|gif|bmp)/.test(fileType);
  },

  /**
   * 判断url或文件名称是否是pdf类型
   */
  isPdf(name = '') {
    const fileType = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
    return /(pdf)/.test(fileType);
  },
};

export default urlUtils;
