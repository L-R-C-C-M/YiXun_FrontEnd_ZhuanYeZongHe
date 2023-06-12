//
import axios from "../utils/request"
import path from "../api/path"

const api = {
    // //1.3 获取用户信息
    // getUserInfo(id) {
    //     return axios.get(path.baseUrl + path.userInfo, { params: { user_id: id } })
    // },
    // //1.3-2 修改个人信息
    // changeUserInfo(user_id, user_name, user_phone, user_email) {
    //     return axios.put(path.baseUrl + path.changeUserInfo, { user_id: user_id, user_name: user_name, user_phone: user_phone, user_email: user_email, user_province: "云南省", user_city: "昆明市", user_area: "五华区", user_address: "一二一大街" })
    // },
    //用户登录
    login(phonenum, password) {
        return axios.post(path.baseUrl + path.userLogin, { "user_phone": phonenum, "user_password": password })
    },
    //获取登录用户头像
    getUserHead(user_id) {
        return axios.get(path.baseUrl + path.userInfo, { params: { user_id: user_id } })
    },
    //获取邮箱验证码
    getEmailCheckNum(email_addr) {
        return axios.post(path.baseUrl + path.emailCheckNum, null, { params: { email: email_addr } })
    },

    //修改密码时获取邮箱验证码
    getpwChangeEmailCheckNum(email_addr) {
        return axios.post(path.baseUrl + path.pwChangeEmailChecknum, null, { params: { email: email_addr } })
    },

    //找回密码处修改密码
    findPassword(user_id, new_password) {
        return axios.put(path.baseUrl + path.findPasswordChange, { user_id: user_id, new_password: new_password })
    },

    //10.3 注册用户
    Regist(user_name, user_phone, user_email, user_password) {
        return axios.post(path.baseUrl + path.Regist, { user_name: user_name, user_phone: user_phone, user_email: user_email, user_password: user_password })
    },
    //10.4 添加用户地址，头像，性别
    upLoadInfo(user_id, user_gender, user_province, user_city, user_area, user_address, user_head) {
        return axios.put(path.baseUrl + path.upLoadInfo, { user_id: user_id, user_gender: user_gender, user_province: user_province, user_city: user_city, user_area: user_area, user_address: user_address, user_head: user_head })
    },

    GetSearchInfoNum() {
        return axios.get(path.baseUrl + path.GetSearchInfoNum)
    },
    //已获得线索，线索总数
    GetCluesNum() {
        return axios.get(path.baseUrl + path.GetCluesNum)
    },
    //累计已帮助，就是已经找到的信息
    GetFoundInfoNum() {
        return axios.get(path.baseUrl + path.GetFoundInfoNum)
    },

    // 首页展示信息
    // ScreenSearchInfo(lost){
    //     return axios.get(path.baseUrl + path.ScreenSearchInfo,{params:{}})
    // }

    //初始展示全部寻人信息
    GetAllSearchInfo(pageNum, pageSize) {
        return axios.get(path.baseUrl + path.GetAllSearchInfo, { params: { pageNum: pageNum, pageSize: pageSize } })
    },
    ScreenSearchInfo(search_type_1,
        search_type_2,
        search_type_3,
        search_type_4,
        search_type_5,
        search_type_6,
        gender,
        lostdate,
        birthday,
        province,
        city,
        area,
        height_low,
        height_high,
        pageSize,
        pageNum,
        search) {
        return axios
            .post(path.baseUrl + path.ScreenSearchInfo,
                {
                    search_type_1: search_type_1,
                    search_type_2: search_type_2,
                    search_type_3: search_type_3,
                    search_type_4: search_type_4,
                    search_type_5: search_type_5,
                    search_type_6: search_type_6,
                    gender: gender,
                    lostdate: lostdate,
                    birthday: birthday,
                    province: province,
                    city: city,
                    area: area,
                    height_low: height_low,
                    height_high: height_high,
                    pageSize: pageSize,
                    pageNum: pageNum,
                    search: search
                })
    },
    GetSearchInfoPos(infoAd) {
        return axios.get(path.baseUrl + path.GetSearchInfoPos, { params: { infoAd: infoAd } })
    },


    //4.1.1 获取志愿活动列表
    getVolActList(volId, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.volAct, { params: { volId: volId, pageNum: pageNum, pageSize: pageSize } })
    },

    //4.1.2 搜索志愿活动
    getActSearch(act_name, pageNum, pageSize) {
        return axios.post(path.baseUrl + path.searchAct, { "search": act_name, "pageNum": pageNum, "pageSize": pageSize })
    },

    //4.1.3 获取志愿活动详细信息
    getVolActInfo(act_id) {
        //return axios.get(path.volActInfo, { params: { volAct_id: actID } })
        return axios.get(path.baseUrl + path.volActInfo, { params: { VolActId: act_id } })
    },
    //4.1.4 报名&取消报名志愿活动
    getSignUp(user_id, act_id) {
        return axios.get(path.baseUrl + path.volSignUp, { params: { userId: user_id, VolActId: act_id } })
    },
    //获取报名状态
    getApplyState(user_id, act_id) {
        return axios.get(path.baseUrl + path.applyState, { params: { userId: user_id, volAct_id: act_id } })
    },

    //4.2.1 获取志愿机构列表
    getVolInst(pageNum, pageSize) {
        return axios.get(path.baseUrl + path.volInst, { params: { pageNum: pageNum, pageSize: pageSize } })
    },
    //4.2.2 搜索志愿机构
    getInstSearch(inst_name, pageNum, pageSize) {
        return axios.post(path.baseUrl + path.searchInst, { "search": inst_name, "pageNum": pageNum, "pageSize": pageSize })
    },

    //4.2.3 获取志愿机构详细信息
    getVolInstInfo(inst_id) {
        return axios.get(path.baseUrl + path.volInstInfo, { params: { VolInstId: inst_id } })
    },
    //4.3 获取志愿时长排在前10的志愿者信息
    getVolRank() {
        return axios.get(path.baseUrl + path.volRank)
    },


    //yfh
    //10.1 登录发送验证信息
    loginCheck(phonenumber, password) {
        return axios.post(path.baseUrl + path.loginCheck, { user_phone: phonenumber, user_password: password })
    },
    //7.1 展示寻人资讯卡片
    newsCard(news_type, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.newsCard, { params: { news_type: news_type, pageNum: pageNum, pageSize: pageSize } })
    },
    //7.2 展示寻人资讯详情页
    newsInfo(newsid) {
        return axios.get(path.baseUrl + path.newsInfo, { params: { news_id: newsid } })
    },
    //7.3 搜索资讯
    searchNews(search, pageNum, pageSize) {
        return axios.post(path.baseUrl + path.searchNews, { search: search, pageNum: pageNum, pageSize: pageSize })
    },
    //8.1 展示相关部门信息卡片
    departmentCard(province, city) {
        return axios.get(path.baseUrl + path.departmentCard, { params: { province: province, city: city } })
    },
    //8.2 展示相关部门详情
    departmentDetail(dpid) {
        return axios.get(path.baseUrl + path.departmentDetail, { params: { DP_id: dpid } })

    },


    //gjj
    //获取寻人信息详情
    getMissingpersonInfo(id) {
        return axios.get(path.baseUrl + path.getMissingpersonInfoUrl, { params: { search_id: id } })
    },
    //获取寻人信息的所有内容
    getMissingpersonInfoAll(id) {
        return axios.get(path.baseUrl + path.getMissingpersonInfoAllUrl, { params: { searchinfoId: id } })
    },
    //发布线索
    upClue(user_id, searchinfo_id, clue_content, date, detailTime, province, city, area, detailAddress, picNum, clue_pic) {
        return axios.post(path.baseUrl + path.upClueUrl, {
            user_id: user_id,
            searchinfo_id: searchinfo_id,
            clue_content: clue_content,
            date: date,
            detailTime: detailTime,
            province: province,
            city: city,
            area: area,
            detailAddress: detailAddress,
            picNum: picNum,
            clue_pic: clue_pic,
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    },
    //发布线索举报
    upClueReport(user_id, clue_id, report_content) {
        return axios.post(path.baseUrl + path.upClueReportUrl, {
            user_id: user_id,//发布者ID
            clue_id: clue_id,//线索ID
            report_content: report_content
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    },
    //寻人信息举报
    upMisReport(user_id, searchinfo_id, report_content) {
        return axios.post(path.baseUrl + path.upMisReportUrl, {
            user_id: user_id,//发布者ID
            searchinfo_id: searchinfo_id,//线索ID
            report_content: report_content
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    },
    //处理添加寻人信息操作
    upMissperson(user_id, search_type, sought_people_name, sought_people_gender,
        sought_people_height, sought_people_detail, sought_people_birthday, sought_people_state,
        isreport, searchinfo_lostdate, contact_method, province_id, city_id, area_id, address_detail) {
        return axios.post(path.baseUrl + path.upMissingpersonUrl, {
            user_id: user_id,
            search_type: search_type,
            sought_people_name: sought_people_name,
            sought_people_gender: sought_people_gender,
            sought_people_height: sought_people_height,
            sought_people_detail: sought_people_detail,
            sought_people_birthday: sought_people_birthday,
            sought_people_state: sought_people_state,
            isreport: isreport,
            searchinfo_lostdate: searchinfo_lostdate,
            contact_method: contact_method,
            province_id: province_id,
            city_id: city_id,
            area_id: area_id,
            address_detail: address_detail,
        },
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        )
    },
    //修改寻人信息
    changeMisspersonInfo(search_type, sought_people_name, sought_people_gender,
        sought_people_height, sought_people_detail, sought_people_birthday, sought_people_state,
        isreport, searchinfo_lostdate, contact_method, province_id, city_id, area_id, address_detail) {
        return axios.post(path.baseUrl + path.upMissingpersonUrl, {
            search_type: search_type,
            sought_people_name: sought_people_name,
            sought_people_gender: sought_people_gender,
            sought_people_height: sought_people_height,
            sought_people_detail: sought_people_detail,
            sought_people_birthday: sought_people_birthday,
            sought_people_state: sought_people_state,
            isreport: isreport,
            searchinfo_lostdate: searchinfo_lostdate,
            contact_method: contact_method,
            province_id: province_id,
            city_id: city_id,
            area_id: area_id,
            address_detail: address_detail,
        },
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        )
    },
    addPicture(searchInfo_id, searchInfo_pic) {
        return axios.put(path.baseUrl + path.addPictureUrl, { searchInfo_id: searchInfo_id, searchInfo_pic: searchInfo_pic })
    },
    //关注寻人信息
    followMis(userid, infoid) {
        return axios.get(path.baseUrl + path.followMisUrl, {
            params: {
                userid: userid,
                infoid: infoid
            }
        })
    },
    //获取用户是否已关注
    y_n_follow(userid, infoid) {
        return axios.get(path.baseUrl + path.y_n_followMisUrl, {
            params: {
                userid: userid,
                infoid: infoid
            }
        })
    },

    //修改密码
    changePassword(user_id, user_password, new_password) {

        return axios.put(path.baseUrl + path.changePasswordUrl, {
            user_id: user_id,
            user_password: user_password,
            new_password: new_password
        })
    },

    //寻人信息已找到
    missingperHaveFound(searchinfoId) {
        return axios.put(path.baseUrl + path.missingperHaveFoundUrl, null, {
            params: { searchinfoId: searchinfoId }

        })
    },
    //线索核实
    clueVerify(clueId, textarea, checkMan, phoneNumber) {
        return axios.put(path.baseUrl + path.clueVerifyUrl, {
            clueId: clueId,
            textarea: textarea,
            checkMan: checkMan,
            phoneNumber: phoneNumber
        })
    },
    //获取线索详情
    getClueDetail(clueId){
        return axios.get(path.baseUrl + path.getclueDetailUrl, { params: { clueId: clueId } })
    },


    //————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


    //1.3 获取用户信息
    getUserInfo(id) {
        return axios.get(path.baseUrl + path.userInfo, { params: { user_id: id } })
    },
    //1.4 用户管理
    getAllNorUser(pagenum, pagesize) {
        return axios.get(path.baseUrl + path.allNorUser, { params: { pagenum: pagenum, pagesize: pagesize } })
    },
    //1.4.1 封禁用户
    banUser(userid) {
        return axios.put(path.baseUrl + path.banUser, null, { params: { userid: userid } })
    },
    //1.4.2 删除用户
    deleteUser(userid) {
        return axios.delete(path.baseUrl + path.deleteUser, { params: { userid: userid } })
    },
    //1.6.1 删除资讯
    deleteNews(newsid) {
        return axios.delete(path.baseUrl + path.deleteNews, { params: { newsid: newsid } })
    },
    //1.4.3 搜索
    getUserByName(word, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.userByName, { params: { word: word, pagenum: pagenum, pagesize: pagesize } })
    },
    //1.5 志愿者管理
    getAllVol(pagenum, pagesize) {
        return axios.get(path.baseUrl + path.allVol, { params: { pagenum: pagenum, pagesize: pagesize } })
    },
    //1.6 资讯管理
    getAllNews(pagenum, pagesize) {
        return axios.get(path.baseUrl + path.allNews, { params: { pagenum: pagenum, pagesize: pagesize } })
    },
    //1.7.1 获得审核数量
    getVolApplyCount(adminId,) {
        return axios.get(path.baseUrl + path.volApplyCount, { params: { adminId: adminId } })
    },
    //1.7.2 获得需要审核的志愿者信息
    getVolApplyReviewed(adminId, pagenum, pagesize, review) {
        return axios.get(path.baseUrl + path.volApplyReviewed, { params: { adminId: adminId, pagenum: pagenum, pagesize: pagesize, review: review } })
    },
    //1.7.3 通过志愿者申请
    passVolApply(volapplyid) {
        return axios.put(path.baseUrl + path.passVolApply, null, { params: { volapplyid: volapplyid } })
    },
    //1.7.4 拒绝志愿者申请
    denyVolApply(volapplyid) {
        return axios.put(path.baseUrl + path.denyVolApply, null, { params: { volapplyid: volapplyid } })
    },
    //1.8.1 获得信息举报数量
    getInfoRepoCount(adminId) {
        return axios.get(path.baseUrl + path.infoRepoCount, { params: { adminId: adminId } })
    },
    //1.8.2 获得线索举报数量
    getClueRepoCount(adminId) {
        return axios.get(path.baseUrl + path.clueRepoCount, { params: { adminId: adminId } })
    },
    //1.8.3 获得信息举报信息
    getInfoRepoReviewed(adminId, pagenum, pagesize, review) {
        return axios.get(path.baseUrl + path.infoRepoReviewed, { params: { adminId: adminId, pagenum: pagenum, pagesize: pagesize, review: review } })
    },
    //1.8.4 获得线索举报信息
    getClueRepoReviewed(adminId, pagenum, pagesize, review) {
        return axios.get(path.baseUrl + path.clueRepoReviewed, { params: { adminId: adminId, pagenum: pagenum, pagesize: pagesize, review: review } })
    },
    //1.8.5 通过举报
    passInfoRepo(infoid) {
        return axios.delete(path.baseUrl + path.passInfoRepo, { params: { infoid: infoid } })
    },
    //1.8.6 拒绝举报
    denyInfoRepo(inforepoid) {
        return axios.post(path.baseUrl + path.denyInfoRepo, null, { params: { inforepoid: inforepoid } })
    },
    //1.8.7 通过举报
    passClueRepo(clueId) {
        return axios.put(path.baseUrl + path.passClueRepo, null, { params: { clueId: clueId } })
    },
    //1.8.8 拒绝举报
    denyClueRepo(cluerepoid) {
        return axios.put(path.baseUrl + path.denyClueRepo, null, { params: { cluerepoid: cluerepoid } })
    },

    //2.4 用户申请成为志愿者
    userApplyVolunteer(UserId, Specialty, Background, Career) {
        return axios.post(path.baseUrl + path.userApplyVolunteer, { UserId: UserId, Specialty: Specialty, Background: Background, Career: Career })
    },
    //2.5 判断用户是否有正在审核中
    isReviewApply(user_id) {
        return axios.get(path.baseUrl + path.isReviewApply, { params: { user_id: user_id } })
    },
    //————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


    //1.3 获取用户信息
    getUserInfo(id) {
        return axios.get(path.baseUrl + path.userInfo, { params: { user_id: id } })
    },

    //1.1-2管理员发布志愿活动
    // releaseVolActivity(act_name, act_content, act_time, end_time, need_people, act_province, act_city, act_area, act_address, contact_method, vol_id) {
    //     return axios.post(path.baseUrl + path.releaseVolActivity, {
    //         act_name: act_name, act_content: act_content, act_time: act_time, end_time: end_time, need_people: need_people,
    //         act_province: act_province, act_city: act_city, act_area: act_area, act_address: act_address, contact_method: contact_method,
    //         act_initiator: vol_id
    //     })
    // },

    // //1.1-3返回所有志愿机构id和名称
    // getAllVolInst() {
    //     return axios.get(path.baseUrl + path.getAllVolInst)
    // },
    //1.3-2 修改个人信息
    changeUserInfo(user_id, user_name, user_phone, user_email, user_province, user_city, user_area, user_address) {
        return axios.put(path.baseUrl + path.changeUserInfo, { user_id: user_id, user_name: user_name, user_phone: user_phone, user_email: user_email, user_province: user_province, user_city: user_city, user_area: user_area, user_address: user_address })
    },

    uploadAvator(user_id, user_head) {
        return axios.put(path.baseUrl + path.uploadAvator, { user_id: user_id, user_head: user_head })
    },
    //1.1 发布资讯
    releaseNews(id, news_content, news_title, news_type) {
        return axios.post(path.baseUrl + path.releaseNews, { admin_id: id, news_content: news_content, news_title: news_title, news_type: news_type })
    },
    addNewsCover(news_id, news_cover) {
        return axios.put(path.baseUrl + path.addNewsCover, { news_id: news_id, news_cover: news_cover })

    },

    //1.1-2管理员发布志愿活动
    releaseVolActivity(act_name, act_content, act_time, end_time, need_people, act_province, act_city, act_area, act_address, contact_method, vol_id, clue_id) {
        return axios.post(path.baseUrl + path.releaseVolActivity, {
            act_name: act_name, act_content: act_content, act_time: act_time, end_time: end_time, need_people: need_people,
            act_province: act_province, act_city: act_city, act_area: act_area, act_address: act_address, contact_method: contact_method,
            act_initiator: vol_id, act_clueId: clue_id
        })
    },
    //发布志愿活动图片
    addVolActivityPic(volAct_id, volAct_pic) {
        return axios.put(path.baseUrl + path.addVolActivityPic, { volAct_id: volAct_id, volAct_pic: volAct_pic })
    },

    //新增

    //管理员修改志愿活动
    modifyVolActivity(act_id, act_name, act_content, act_time, end_time, need_people, act_province, act_city, act_area, act_address, contact_method, vol_id) {
        return axios.put(path.baseUrl + path.modifyVolActivity, {
            act_id: act_id, act_name: act_name, act_content: act_content, act_time: act_time, end_time: end_time, need_people: need_people,
            act_province: act_province, act_city: act_city, act_area: act_area, act_address: act_address, contact_method: contact_method,
            act_initiator: vol_id
        })
    },

    //管理员删除志愿活动
    deleteVolActivity(act_id) {
        return axios.delete(path.baseUrl + path.deleteVolActivity, { params: { actId: act_id } })
    },

    //1.1-3返回所有志愿机构id和名称
    getAllVolInst() {
        return axios.get(path.baseUrl + path.getAllVolInst)
    },
    //1.3-2 修改个人信息
    changeUserInfo(user_id, user_name, user_phone, user_email, user_province, user_city, user_area, user_address) {
        return axios.put(path.baseUrl + path.changeUserInfo, { user_id: user_id, user_name: user_name, user_phone: user_phone, user_email: user_email, user_province: user_province, user_city: user_city, user_area: user_area, user_address: user_address })
    },
    //上传头像
    uploadAvator(user_id, user_head) {
        return axios.put(path.baseUrl + path.uploadAvator, { user_id: user_id, user_head: user_head })
    },
    //1.1 发布资讯
    releaseNews(id, news_content, news_title, news_type) {
        return axios.post(path.baseUrl + path.releaseNews, { admin_id: id, news_content: news_content, news_title: news_title, news_type: news_type })
    },
    addNewsCover(news_id, news_cover) {
        return axios.put(path.baseUrl + path.addNewsCover, { news_id: news_id, news_cover: news_cover })

    },
    //2.1 展示用户发布的所有寻人信息
    getAllSearchInfoPublished(user_id, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.getAllSearchInfoPublished, { params: { user_id: user_id, pageNum: pageNum, pageSize: pageSize } })
    },
    //2.2 展示用户发布的所有寻人线索
    getAllCLuesPublished(user_id, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.getAllCLuesPublished, { params: { user_id: user_id, pageNum: pageNum, pageSize: pageSize } })
    },
    //2.3 展示用户关注的所有寻人信息
    getFollowInfo(user_id, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.getFollowInfo, { params: { userid: user_id, pagenum: pagenum, pagesize: pagesize } })
    },
    //3.1 展示志愿者跟进的所有寻人信息
    getFollowUpInfo(volid, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.getFollowUpInfo, { params: { volid: volid, pagenum: pagenum, pagesize: pagesize } })
    },
    //3.2 展示志愿者报名的所有志愿活动
    getVolApplyAct(userId, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.getVolApplyAct, { params: { userId: userId, pagenum: pagenum, pagesize: pagesize } })
    },
    //用户删除自己发布的寻人信息
    userDeleteInfo(userid, infoid) {
        return axios.delete(path.baseUrl + path.userDeleteInfo, { params: { userid: userid, infoid: infoid } })
    },
    ////用户删除自己发布的寻人线索
    userDeleteClue(userid, clueid) {
        return axios.delete(path.baseUrl + path.userDeleteClue, { params: { userid: userid, clueid: clueid } })
    },
    //注册志愿者数
    GetVolunteerNum() {
        return axios.get(path.baseUrl + path.getVolunteerNum);
    },


    /* 财务管理 */
    //获取全部支出记录
    getFundOutList(pagenum, pagesize) {
        return axios.get(path.baseUrl + path.fundOutList, { params: { pageNum: pagenum, pageSize: pagesize } });
    },
    //根据月份筛选支出记录
    selectFundOut(startTime, endTime, pagenum, pagesize) {
        return axios.post(path.baseUrl + path.fundOutSelectByMonth, { startTime: startTime, endTime: endTime, pageNum: pagenum, pageSize: pagesize });
    },
    //获取全部收入与支出
    getFundTotal() {
        return axios.get(path.baseUrl + path.fundTotalForYear);
    },
    //添加支出记录
    addFundOut(amount, id, usage, time) {
        return axios.post(path.baseUrl + path.addFundOutInfo, { fund_out_amount: amount, administrator_id: id, fund_out_usage: usage, fund_out_time: time });
    },
    //删除支出记录
    deleteFundOut(id) {
        return axios.delete(path.baseUrl + path.deleteFundOutInfo, { params: { fundOutId: id } });
    },
    /* 志愿捐款 */
    //获取捐款总额
    getDonateCount() {
        return axios.get(path.baseUrl + path.getDonateCount);
    },
    //获取捐款人数
    getDonateHead() {
        return axios.get(path.baseUrl + path.getDonateHead);
    },
    //获取捐款记录
    getDonateRecord(pageNum, pageSize) {
        return axios.get(path.baseUrl + path.getDonateRecord, { params: { pageNum: pageNum, pageSize: pageSize } });
    },
    //获取支出记录
    getFundOutRecord(pageNum, pageSize) {
        return axios.get(path.baseUrl + path.getFundOutRecord, { params: { pageNum: pageNum, pageSize: pageSize } });
    },

    //工作人员拒绝跟进的寻人信息
    refuseFollowUp(volid, search_info_id) {
        return axios.get(path.baseUrl + path.refuseFollowUp, { params: { volid: volid, search_info_id: search_info_id } });
    },

    //创建订单
    createOrder(user_id, total_amount) {
        return axios.post(path.baseUrl + path.createOrder, null, { params: { user_id: user_id, total_amount: total_amount } })
    },
    //查看支付状态
    payCheck(out_trade_no) {
        return axios.get(path.baseUrl + path.payCheck, { params: { out_trade_no: out_trade_no } });
    },
    //根据地区筛选工作人员
    searchVolByDistinct(city, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.searchVolByDistinct, { params: { city: city, pagenum: pagenum, pagesize: pagesize } });
    },
    //查看报名的用户信息
    showAllRecruited(actId, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.showAllRecruited, { params: { actId: actId, pageNum: pageNum, pageSize: pageSize } });
    }


}

export default api;