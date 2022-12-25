class dyList {
  constructor(data = []) {
    this.ids = [];
    this.addList(data);
  }

  add(index) {
    if (typeof index === "number") {
      index = this.ids.length || 0;
    }
    this.ids.splice(index, 0, this.signRonder());
  }

  /**
   * 删除
   * @param {*} val
   * @param {*} typeField  "index" || "key"
   */
  detete(val, typeField = "key") {
    if (typeField === "index") {
      this.ids.splice(val, 1);
    } else {
      this.ids = this.ids.filter((item) => item !== val);
    }
  }

  clear() {
    this.ids = [];
  }

  addList = (data = []) => {
    this.data = data;
    this.ids = this.data.map(() => this.signRonder());
  };

  signRonder = (n = 8) => {
    //取随机数
    var str = "123456789aAbBcCdDeEfFgGhHiIjJkKlLmMoOpPqQurRsStTuUvVwWxXyYzZ_-";
    if (n < 3) n = 30;
    var ronderstr = "";
    for (var i = 0; i < n; i++) {
      var index = Math.floor(Math.random() * str.length);
      ronderstr += str[index];
    }
    return ronderstr;
  };
}
