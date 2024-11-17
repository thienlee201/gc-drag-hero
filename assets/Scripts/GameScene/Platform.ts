
const {ccclass, property} = cc._decorator;
@ccclass
export default class Platform extends cc.Component {
    start () {

    }
    protected onEnable(): void {
        cc.tween(this.node).to(0.5, {position: cc.v3(this.node.position.x, -300)}, {easing: cc.easing.circOut}).start();
    }
}
