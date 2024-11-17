import GCT_SDK from "./GCTSDK";

const { ccclass, property } = cc._decorator;


@ccclass
export default class GameController extends cc.Component {

    static instance: GameController;
    @property(cc.Node) player: cc.Node = null;
    @property(cc.Node) initPlatform: cc.Node = null;
    @property(cc.Node) spawnPos: cc.Node = null;
    @property(cc.Node) touchRegion: cc.Node = null;
    @property(Array(cc.Prefab)) listPlatform: Array<cc.Prefab> = Array<cc.Prefab>();
    newPlatform: cc.Node = null;
    canTouch: boolean = true;
    firstTouch: boolean = true;

    start() {
        GCT_SDK.challengeLoaded();
        this.newPlatform = cc.instantiate(this.listPlatform[this.random(0, this.listPlatform.length - 1)]);
        this.newPlatform.children[0].active = false
        this.newPlatform.children[1].active = false
        this.spawnPos.parent.addChild(this.newPlatform);
        this.newPlatform.setPosition(cc.v3(this.spawnPos.x + this.random(-20, 20), this.spawnPos.y))
        this.touchRegion.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.touchRegion.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.touchRegion.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    onTouchStart(eventT) {
        if (!this.canTouch) return;
        if (this.firstTouch) {
            GCT_SDK.challengeStarted();
            this.firstTouch = false;
        }
        let tocLoc = this.touchRegion.convertToNodeSpaceAR(eventT.getLocation());
        cc.tween(this.player).to(0.1, { position: tocLoc }, { easing: 'smooth' }).start()
        this.player.getComponent(cc.Animation).play();
    }
    onTouchMove(eventT) {
        if (!this.canTouch) return;
        let tocLoc = this.touchRegion.convertToNodeSpaceAR(eventT.getLocation());
        this.player.setPosition(tocLoc)
    }
    onTouchEnd(eventT) {
        if (!this.canTouch) return;
        this.player.getComponent(cc.Animation).stop();
        let playerPos = this.player.parent.convertToWorldSpaceAR(this.player.getPosition());
        if (this.player.position.x >= 0) {
            let target1 = this.newPlatform.children[0].parent.convertToWorldSpaceAR(this.newPlatform.children[0].getPosition());
            let target2 = this.newPlatform.children[1].parent.convertToWorldSpaceAR(this.newPlatform.children[1].getPosition());
            if (playerPos.y > target1.y && playerPos.x > target1.x && playerPos.x < target2.x) {
                this.canTouch = false;
                cc.tween(this.player)
                    .to(cc.Vec3.distance(cc.v3(this.player.getPosition().x, target1.y + 5, 0), cc.v3(playerPos)) / 450,
                        { position: this.player.parent.convertToNodeSpaceAR(cc.v3(playerPos.x, target1.y + 5, 0)) }).call(() => {
                            GCT_SDK.challengePass();
                        }).start()
            }
            else {
                this.canTouch = false;
                cc.tween(this.player).by(2, { position: cc.v3(0, -666, 0) }).call(() => {
                    GCT_SDK.challengeNotPass()
                }).start()
            }
        }
        else {
            let target1 = this.initPlatform.children[0].parent.convertToWorldSpaceAR(this.initPlatform.children[0].getPosition());
            let target2 = this.initPlatform.children[1].parent.convertToWorldSpaceAR(this.initPlatform.children[1].getPosition());
            if (playerPos.y > target1.y && playerPos.x > target1.x && playerPos.x < target2.x) {
                cc.tween(this.player)
                    .to(cc.Vec3.distance(cc.v3(this.player.getPosition().x, target1.y + 5, 0), cc.v3(playerPos)) / 450,
                        { position: this.player.parent.convertToNodeSpaceAR(cc.v3(playerPos.x, target1.y + 5, 0)) }).call(() => {

                        }).start()
            }
            else {
                this.canTouch = false;
                cc.tween(this.player).by(2, { position: cc.v3(0, -666, 0) }).call(() => {
                    GCT_SDK.challengeNotPass()
                }).start()
            }
        }
    }

    random(minInclusive: number, maxInclusive: number): number {
        return Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
    }
}
