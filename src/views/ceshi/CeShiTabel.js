import React from 'react';
import RoleCheckbox from 'components/role/RoleCheckbox';
import {Menu, Table, message, Modal} from 'antd';
const confirm = Modal.confirm;
import Btn from 'components/public/BaseBtn';
import {connect} from 'react-redux';
import 'styles/less/personType.less';
import 'styles/less/basebtn.less';
import Map from 'components/role/Map';
import { operationRoleAppBtn, queryRoleAppBtnData, deleteAppAction} from 'actions/role';

var mapStateToProps = function(state){
    return {
        roleData: state.getRole
    }
};
//规范属性类型
var propTypes = {
    personTypes: React.PropTypes.object,
    dispatch : React.PropTypes.func
};
class RoleApplicationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: true,
        };
        this.chooseApp = this.chooseApp.bind(this);
        this.addColName = this.addColName.bind(this);
        this.addDataPid = this.addDataPid.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.addChildrenRow = this.addChildrenRow.bind(this);
        this.addAppBtnData = this.addAppBtnData.bind(this);
        this.addAppData = this.addAppData.bind(this);
        this.isGroupRow = this.isGroupRow.bind(this);
        this.checkGroupAndColumnState = this.checkGroupAndColumnState.bind(this);//确保 组全选 和 列 全选
        this.deleteApp = this.deleteApp.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.initRoleAppBtnData = this.initRoleAppBtnData.bind(this);
        this.cancelChooseState = this.cancelChooseState.bind(this);
        this.saveCheckedAppBtn = this.saveCheckedAppBtn.bind(this);
        this.afterSaveCheckedAppBtn = this.afterSaveCheckedAppBtn.bind(this);

        this.cid = 0;
        this.rowNum = 0;
        this.colNum = 0;

        //map
        this.checkboxIdMapState= new Map();//checkboxId 映射 State
        this.parentRow = new Map();//每个checkboxId节点 对应最左边的哪个应用
        this.parentCol = new Map();//每个checkboxId节点 对应最上边的哪个按钮
        this.childrenRow = new Map();//当前行的所有子行
        this.checkboxIdMapAppBtnData = new Map();//每个checkbox对应的 appid，btnGroupId
        this.checkboxIdMapAppData = new Map();//记录被选中的应用

        //保存数据
        this.dataQueue = [];// appid，btngroupId队列
        //删除应用
        this.deleteAppIds = [];

        //测试数据
        this.appData = [{name: '报表',id: "456",key: '5', children: [{ name: '合同价款', id: "45xx61", key: '6', },{ name: '合同台账', id: "45xf61", key: '7', }], }, { name: '图标', id: "789", key: '1', children: [{ name: '小图标', id: "45xx60", key: '4' },{ name: '大图标',  id: "4xx560", key: '8' }] }];
        this.btnGroupColumns = [{id: '12xx3', name: '小部件', colname: 'name'}, {id:'43xx5', name:'显示'}, {id:'43xfffx5', name:'test'}];
    }

    //确认提示框
    showConfirm(title,message,dispatch,functionT,functionQueryData) {
        confirm({
            title: title,
            content: message,
            onOk() {
                dispatch(functionT(functionQueryData));
            },
            onCancel() {

            }
        });
    }

    componentDidMount() {
        //const roleId = '4028968156b025da0156b027d0180000';
        this.initRoleAppBtnData();
    }

    initRoleAppBtnData(){
        const roleId = this.props.roleId;
        if(roleId) {//通过角色id加载 数据
            const { dispatch } = this.props;
            const querydata = {roleId: roleId};
            dispatch(queryRoleAppBtnData(querydata));
        }
    }

    cancelChooseState(){//取消权限的更改
        this.initRoleAppBtnData();
    }

    componentWillReceiveProps(nextProps) {
        const {roleData} = nextProps;
        if (roleData.msg) {
            if(roleData.msg.indexOf('成功') >= 0)
                message.success(roleData.msg, 5);
            else if(roleData.msg.indexOf('失败') >= 0)
                message.error(roleData.msg, 5);
            else
                message.info(roleData.msg, 5);
            // if (roleData.msg == '保存成功') {//角色保存成功后 仍然留在当前页面， 继续 角色按钮组权限
            //   this.props.history.pushState(null, 'rolecenter');
            // }
        }
    }

    chooseApp(){
        this.props.chooseApp();
    }

    sendCheckData(){
        const { dispatch } = this.props;
        const queryData = {
            'vos': this.dataQueue,//对应后端的字段
            'roleId': this.props.roleId,
        };
        dispatch(operationRoleAppBtn(queryData, this.afterSaveCheckedAppBtn));
    }

    ////////////////////////////////////////////////////////////////////////////////

    addChildrenRow(appData){//添加所有子行 标识
        if(!appData) return;
        for(var i=0; i<appData.length; ++i) {//获取行头的checkboxId
            this.rowNum++;//获取行号
            var curRowHeadCheckboxId = appData[i].name.split('_')[1];
            var childrenRow = this.childrenRow;
            if(!childrenRow.get(curRowHeadCheckboxId)) childrenRow.put(curRowHeadCheckboxId, []);
            this.addChildrenRow(appData[i].children);
            childrenRow.get(curRowHeadCheckboxId).push(curRowHeadCheckboxId);//加入当前行
            if(appData[i].children) {//加入子行
                for(var j=0; j<appData[i].children.length; ++j) {
                    var childCurRowHeadCheckboxId = appData[i].children[j].name.split('_')[1];
                    var descendants = childrenRow.get(childCurRowHeadCheckboxId);//孙子们节点
                    for(var k=0; k<descendants.length; ++k){
                        childrenRow.get(curRowHeadCheckboxId).push(descendants[k]);
                    }
                }
            }
        }
    }

    addDataPid(btnGroupColumns, appData) {//生成新的列， 并且为非表头的每一个单元格设置固定 id，（防止表格渲染时 id发生变化）
        if(!appData) return;
        for(var i=0; i<appData.length; ++i) {
            for(var j=0; j<btnGroupColumns.length; ++j) {
                if(!appData[i][btnGroupColumns[j].colname]) {
                    appData[i][btnGroupColumns[j].colname] = btnGroupColumns[j].id + '_' + (++this.cid);//为这一行数据添加新的列

                    //判断应用对应的按钮是否已经选择上, judgeDefaultChecked

                    if(appData[i].select && appData[i].select[btnGroupColumns[j].id]) {//btnGroupColumns[j].id == btnGroupId
                        this.checkboxIdMapState.put(this.cid, true);
                    } else {
                        this.checkboxIdMapState.put(this.cid, false);
                    }
                } else if(btnGroupColumns[j].colname == 'name'){
                    if(appData[i][btnGroupColumns[j].colname].indexOf('_') >= 0) continue;
                    appData[i][btnGroupColumns[j].colname] += '_' + (++this.cid);
                    this.checkboxIdMapState.put(this.cid, false);
                }
            }
            this.addDataPid(btnGroupColumns, appData[i].children);
        }
    }

    addColName(btnGroupColumns, appData){
        if(btnGroupColumns) {
            btnGroupColumns.map((elem, index)=> {
                if(!elem.colname) {
                    elem.colname = elem.id;
                }
                elem.cid = ++this.cid;
            });
        }

        if(appData) {
            this.addDataPid(btnGroupColumns, appData);
            /////清空数据
            var keySet = this.childrenRow.keySet();
            for(var key in keySet){
                if(this.childrenRow.get(keySet[key]) && this.childrenRow.get(keySet[key]).length)
                    this.childrenRow.get(keySet[key]).length = 0;
            }
            /////总行数
            this.rowNum = 0;
            this.addChildrenRow(appData);
            ++this.rowNum;
            /////判断应用对应的checkbox是否选中，列头对应的checkbox是否选中
            this.checkGroupAndColumnState();
        }
    }

    addAppBtnData(cid){
        var curCheckboxData = this.checkboxIdMapAppBtnData.get(cid);
        if(curCheckboxData) {
            var curQueueData = {
                roleId: this.props.roleId,
                btnGroupId: curCheckboxData.btnGroupId,
                appId: curCheckboxData.appId,
            };
            this.dataQueue.push(curQueueData);
        }
    }

    addAppData(cid){
        var checked = this.checkboxIdMapState.get(cid);
        if(checked == false) return;
        var curAppId = this.checkboxIdMapAppData.get(cid);
        if(curAppId) {
            var curQueueData = {
                roleId: this.props.roleId,
                appId: curAppId,
            };
            this.deleteAppIds.push(curQueueData);
        }
    }

    isGroupRow(cid){//判断是否为分组
        //第一行当做分组
        if(parseInt((cid-1)/this.colNum)*this.colNum+1 == 1) return true;

        const parentRow = this.parentRow;
        const childrenRow = this.childrenRow;
        var curRowHeadCheckboxId = parentRow.get(cid) ? parentRow.get(cid) : parseInt((cid-1)/this.colNum)*this.colNum+1;//通过cid 和 curRowHeadCheckboxId获取到cid对应的checkbox到左边的距离
        var rowIds = childrenRow.get(curRowHeadCheckboxId);//所有子行的行头的 checkboxId
        return rowIds.length > 1 ? true : false;
    }

    checkGroupAndColumnState() {
        const childrenRow = this.childrenRow;
        const checkboxIdMapState = this.checkboxIdMapState;
        const colNum = this.colNum;
        const rowNum = this.rowNum;

        const rowState = [];

        for(var i=0; i<=rowNum; ++i)
            rowState.push(true)//默认所有的行全选
        rowState[1] = false;

        //判断分组列
        for(var row=2; row <= rowNum; ++row) {
            const cid = (row-1)*colNum+1;//每一行的第一个
            if(!this.isGroupRow(cid)) continue;
            var cids = childrenRow.get(cid);
            const childRowNum = cids.length-1;
            for(var curRowCid = cid; curRowCid<cid+this.colNum; ++curRowCid) {//遍历这一分组行的checkboxId
                var curColState = true;
                for(var childRowCid = curRowCid+this.colNum, cnt = 0; cnt < childRowNum; childRowCid += this.colNum, ++cnt) {
                    if(checkboxIdMapState.get(childRowCid) == false) {
                        curColState = false;
                        break;
                    }
                }
                checkboxIdMapState.put(curRowCid, curColState);
            }
        }

        // 判断列 是否被选中
        if(rowNum > 1) {
            for(var col=1; col<=colNum; ++col) {
                var curColState = true;
                for(var cid=col+colNum; cid<=colNum*rowNum; cid+=colNum){
                    if(checkboxIdMapState.get(cid) == false) {
                        curColState = false;
                        break;
                    }
                }
                var cid = col;
                checkboxIdMapState.put(cid, curColState);//这一列的状态
            }
        } else if(rowNum == 1) {//每一列的状态清空
            for(var cid = 1; cid <= this.colNum; ++cid)
                checkboxIdMapState.put(cid, false);
        }

    }

    onChecked(cid, btnGroupId, appId, checked){//checkboxId, 按钮id，应用id
        if(this.state.isEdit == true && cid%this.colNum != 1) {//第一列为应用列，随时可以编辑
            message.info('请进入编辑状态', 2);
            return ;
        }
        const checkboxIdMapState = this.checkboxIdMapState;
        const parentRow = this.parentRow;
        const parentCol = this.parentCol;
        const childrenRow = this.childrenRow;
        const colNum = this.colNum;
        const rowNum = this.rowNum;

        if(btnGroupId == null && appId == null) {
            for(var cur_cid=1; cur_cid<=colNum*rowNum; cur_cid+=colNum) {
                checkboxIdMapState.put(cur_cid, checked);
            }
        } else if(btnGroupId == null) {//appId 不为null, 所有的子应用全选
            var rowHeadCheckboxIds = childrenRow.get(cid);//所有子行的行头的 checkboxId（对应应用）
            for(var i=0; i<rowHeadCheckboxIds.length; ++i) {
                var cur_cid = rowHeadCheckboxIds[i];
                checkboxIdMapState.put(cur_cid, checked);
            }
        } else if(appId == null) {//btnId不为null，这一列全部check
            var cur_cid = cid;
            while(cur_cid <= rowNum*colNum) {
                checkboxIdMapState.put(cur_cid, checked);
                cur_cid += colNum;
            }
        } else {//都不为null
            var curRowHeadCheckboxId = parentRow.get(cid);//通过cid 和 curRowHeadCheckboxId获取到cid对应的checkbox到左边的距离
            var rowIds = childrenRow.get(curRowHeadCheckboxId);//所有子行的行头的 checkboxId
            for(var i=0; i<rowIds.length; ++i) {//这一列全部check
                var cur_cid = parseInt(rowIds[i]) + (cid-curRowHeadCheckboxId);
                checkboxIdMapState.put(cur_cid, checked);
            }

        }
        this.setState({});
    }

    deleteApp(){
        this.deleteAppIds.length = 0;//清空数据
        const {dispatch} = this.props;
        for(var cid = 1; cid <= this.rowNum*this.colNum; cid += this.colNum) {
            if(!this.isGroupRow(cid)) {
                this.addAppData(cid);
            }
        }

        if(this.deleteAppIds.length == 0) {
            message.success('请选择应用', 5);
            return;
        }

        const queryData = {
            vos: this.deleteAppIds,
        }

        this.showConfirm('删除应用', '确定删除应用?', dispatch, deleteAppAction, queryData);
    }

    afterSaveCheckedAppBtn(){
        this.setState({
            isEdit: true,
        });
    }

    saveCheckedAppBtn(){
        if(this.state.isEdit == true) {
            this.setState({
                isEdit: false,
            });
            return ;
        }
        //清空数据队列
        this.dataQueue.length = 0;
        for(var cid = this.colNum+1; cid <= this.colNum*this.rowNum; ++cid) {//从第二行的checkbox 开始
            if(this.isGroupRow(cid)) {
                cid += this.colNum;
            }
            if(cid%this.colNum != 1) {//第一列为 应用列
                if(this.checkboxIdMapState.get(cid) == true)
                    this.addAppBtnData(cid);
            }
        }

        this.sendCheckData();
    }

    ////////////////////////////////////////////////////////////////////////////////

    render() {
        let {roleData} = this.props;
        var appData = [];
        var btnGroupColumns = [];
        if(roleData.permissiondData) {
            if(roleData.permissiondData.listAppBtnGroup) {
                btnGroupColumns = roleData.permissiondData.listAppBtnGroup;
            }
            if(roleData.permissiondData.listPermissionApp) {
                appData = roleData.permissiondData.listPermissionApp;
            }
        }
        // const appData = this.appData;
        // const btnGroupColumns = this.btnGroupColumns;
        // console.log(appData)
        let self = this;
        this.cid = 0;
        this.colNum = btnGroupColumns.length;//获得列宽
        const checkboxIdMapState = this.checkboxIdMapState;
        const parentRow = this.parentRow;
        const parentCol = this.parentCol
        if(btnGroupColumns) {
            this.addColName(btnGroupColumns, appData);//对应用的数据进行一个简单的处理

            btnGroupColumns.map((elem, index)=> {
                //elem.colname=='name' ? null : elem.id, 默认左上角的id 没有 appId 和 btnGroupId
                elem.title= <RoleCheckbox btnGroupId={elem.colname=='name' ? null : elem.id} appId={null} cid={elem.cid} onChecked={self.onChecked} checked={checkboxIdMapState.get(elem.cid)} title={elem.name}/>,
                    elem.key = elem.dataIndex = elem.colname;
                elem.render = function(text, record, index){// text的值 == 对应表头列的Id == elem.id
                    var contents = text.split('_');
                    text = contents[0];
                    var cur_cid = contents[1];//当前列顶端 checkboxId

                    //判断是否是第一列
                    if(record.name.split('_')[0] != text) {//不是第一列
                        var leftCheckBoxId = record.name.split('_')[1];
                        parentRow.put(cur_cid, leftCheckBoxId);//该 checkboxId 对应的 (应用Id == leftCheckBoxId)

                        //加入每个checkbox  要传输的数据（appId, btnGroupId）
                        self.checkboxIdMapAppBtnData.put(cur_cid, {appId: record.id, btnGroupId: elem.id})
                    } else {//应用列
                        self.checkboxIdMapAppData.put(cur_cid, record.id);
                    }
                    //该 checkboxId 对应的 最上边的 checkboxId
                    parentCol.put(cur_cid, elem.cid);//该 checkboxId 对应的 (按钮Id == elem.cid)

                    //record.name.split('_')[0] 最原始的 name 的value
                    return <RoleCheckbox btnGroupId={record.name.split('_')[0] == text ? null : elem.id} appId={record.id} cid={cur_cid} onChecked={self.onChecked} checked={checkboxIdMapState.get(cur_cid)} title={text==elem.id ? null : text}/>
                }
            });
        }

        return (
            <div>
                <Btn iconName="icon-add" isdisabled={self.props.roleId ? false : true} onClick={this.chooseApp} btnClass="add-btn" btnName="选择应用"/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Btn iconName="icon-jianhao" isdisabled={self.props.roleId ? false : true} btnClass="delete-btn" btnName="删除应用" onClick={self.deleteApp}/>
                <Table style={{marginTop: "10px", marginBottom: "10px"}}
                       indentSize={15}
                       className="personType-table"
                       columns={btnGroupColumns}
                       dataSource={appData}
                       pagination={false}
                />
                <div style={{display: self.rowNum > 1 ? '' : 'none'}}>
                    <Btn btnClass="save-btn" btnName={self.state.isEdit == true ? "编辑" : "保存"} onClick={this.saveCheckedAppBtn}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Btn btnClass="cancel-btn" btnName="取消" onClick={self.cancelChooseState}/>
                </div>
            </div>
        );
    }
}
module.exports = RoleApplicationTable;
RoleApplicationTable.propTypes = propTypes;
module.exports = connect(mapStateToProps)(RoleApplicationTable);