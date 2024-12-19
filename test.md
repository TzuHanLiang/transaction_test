# 產品需求文件 (Teams 與 Roles)

> [!note]
> - [Figma連結](https://www.figma.com/design/qSOAuNX7hxVQaKD51ghONu/iSunFA-Mockup-(Beta)?node-id=5-12192&p=f&t=BvbeEKg3ixJALaFx-0)
> - [Figma團隊機制(用來參考)](https://help.figma.com/hc/en-us/articles/360039484194-Create-and-explore-a-team)
> - [制定isunFA 訂閱制的方案](https://github.com/CAFECA-IO/Documents/issues/1041#top)

## 1. 文件概況
### 1.1 修訂紀錄

| 日期       | 修訂人緣 | 版本 | 修改內容 |
| ---------- | -------- | ---- | -------- |
| 2024/12/12 | Murky    | v1.0 | 初版     |
| 2024/12/17 | Murky    | v1.1 | 開會後修改User Story, 但仍有地方需要後續討論  |

## 1.2 會議記錄


| 日期         | 主持人   | 主旨                | 連結  |
| ---------- | ----- | ----------------- | --- |
| 2024/12/17 | Murky & Straw | 確認UserStory與api劃分 | [Link](hthttps://github.com/CAFECA-IO/EventReport/blob/main/meeting/20241218_isunfa_team&Sub.mdtps://github.com/CAFECA-IO/EventReport/blob/main/meeting/20241216_isunfa_team_userstory_api.md)|
| 2024/12/18 | Straw & Jodie | 討論Teams功能細節  |  [Link](https://github.com/CAFECA-IO/EventReport/blob/main/meeting/20241218_isunfa_team&Sub.md)   |
| 2024/12/18 | Murky & Shirely | 依照上一場會議內容以後端角度確認User Story| [Link](https://github.com/CAFECA-IO/EventReport/issues/50) |



## 2. 功能介紹
### 2.1 功能簡介
- 藉由團隊功能讓多名用戶能一起協作會計帳本的記帳
- 本篇不包含 "媒合(Matching)"和"訂閱(Subscription)"功能

> 所屬畫面範圍如下

![image](https://github.com/user-attachments/assets/ae2f6fbf-8844-4ec0-8890-d6dfc449fb5c)
## 2.2 User Story


> [!Warning]
> - 本篇不執行媒合與訂閱功能

### 2.2.1 名詞解釋

- `User`: ISunFa的使用者
- `Role`: `User` 點進ISunFa之後選擇的身份，會影響到`User`可以用ISunFa的哪些功能，有:
	1. Accountant
	3. 試用版
	4. 資方
	
- `Team`:  團隊，一個或複數個`User`的集合，一個`User`會參與 一至多個`Team`，分成以下兩種：
	- 個人`Team`: 每個`User`加入ISunFa時會被綁定在一個預設只有該`User`的`Team`(但之後還是可以增加`User`)
	- 一般`Team`: 可由`User`創立，可以增加複數位`User`

- `Team Authorisation`:  `一位User` 在 一個 `Team` 中，被授權的等級，影響`User` 是否可以對`Team`進行特定功能的操作，以及可以看到`Team`中的哪些東西，有以下等級:
	- `Owner`
	- `Administrator`
	- `Editor`
	- `Viewer`
	
- `ledger`: 帳本(Alpha 版中的 `Company`)，ISunFa功能操作時的目標對象，一個`個人Team` 可以新增管理多個 `Ledger`， 一般`Team` 會自動(需要討論)擁有旗下 User 的`個人Team`裡面的`ledger`，並管理編輯、閱覽權限

### 2.2.2 Role 與 KYC相關
1. 選擇與切換 Role
	- 身為一個 `User` 
		- 我希望可以依據我的使用需求選擇適合的 `Role`，並且切換不同的 `Role` 以使用對應的功能，
		- 所以我需要能夠新增或切換我的 `Role`，且每個 `User` 的 `Role` 不會重複。
2. 針對不同 Role 提供專屬功能
	- 身為一個 `User` 
		- 我希望在選擇 `Role` 後，可以看到該 `Role` 的專屬功能（例如資方的薪資功能、會計師的記帳功能），
		- 所以我需要 ISunFa 根據我選擇的 `Role` 顯示對應的專屬功能，同時提供必要的共用功能。



### 2.2.3 Team 相關
 
 1. 建立與加入 `Team`
	- 身為一個`User`
	- 我希望能與其他 `User` 合作處理業務和管理 `ledger`，
	- 所以我需要能夠建立 `Team` 邀請他人加入，或被邀請加入其他人建立的 `Team`。
2. 邀請未註冊的 `User`
	- 身為一個`User`
	- 我希望在未註冊 ISunFa 帳戶的情況下也能被邀請加入 `Team`，
	- 所以我需要邀請者能通過 Email 發送邀請連結給我，若我已有帳戶，則在邀請輸入欄位顯示我的頭像與名稱。
	- 邀請加入team的Email，不論是不是在`ISunFa`有帳號，都應該要使用 `loginUrl?token=haskTeamToken`的方法實做，藉由google oath2 傳遞token, 在登入時session(或別的地方)同時存在token與User, 就可以直接把team加入該User。
	- 如果已經在IsunFa內的帳號，邀請時只有打開Email通知的用戶才會收到邀請email
	- 如果已經在IsunFa內的帳號，不論是否打開Email通知，都應該要收到小鈴鐺通知，並且可以從小鈴鐺通知裡加入team
3. `Ledger`公開與非公開
	- 身為一個 `Team` 的 `Owner`或是`Admin`
	- 我希望可以管理 `Team` 中`ledger`是誰可以access，
	- 所以我需要能建立在`Team`上的`Ledger`，如果是公開，`Team`的`User`都能查看，非`Viewr`的`User`可以進行編輯，設為非公開的`Ledger`只有`Owner`跟`Administrator`才能看到。
4. `Owner` 的權限
	- 身為 `Team`中為 `Owner`的`User`
	- 我希望可以全面管理 `Team`，
	- 所以我需要以下權限：
		- 一個`team`只有一個`owner`
		- 邀請和刪除`User`
		- 可以調整`User`成為 `Administrator` 、`Editor`、`Viewer`
		- 設定收款管道
        - `Owner`目前不能轉移`Owner`權限
		- 以及其他 `Administrator`、`Editor`、`Viewer`的功能
5. `Administrator` 的權限
	- 身為 `Team`中為 `Administrator`，我是事務所/公司的成員
	- 我希望可以負責管理`Owner`、`Administrator`以外的成員 (`Editor`、 `Viewer`)
	- 所以我需要以下權限:
		- 能邀請或刪除 `Editor`、`Viewer`
		- 更改`Team`的Meta資料 (Team name, Team Website, Team Description)
		- 可以創`ledger`
		- 可以編輯`ledger`的`metadata`
		- 可以用`Teams`接案
		- 管理`ledger` 的閱覽權限 (編輯閱覽權限可以直接決定 ledger會出現在哪些`Team`的`User`的閱覽畫面裡面，因此也會同時決定誰可以編輯這個ledger) => 請與Straw再次確認，我可能寫錯了)
    	- 以及其他`Editor`、 `Viewer`的功能
6. `Editor` 的權限
	- 身為 `Team`中為 `Editor`，我是事務所/公司的成員
	- 我希望可以主要負責管理`ledger`
	- 所以我需要以下的權限：
		- 可以編輯`ledger`(不含metadata)
		- 以及其他`Viewer`的功能

7. `Viewer` 的權限
	- 身為 `Team`中為 `Viewer`的`User` ，我是屬於事務所/公司之外的成員 
	- 我希望能使用 ISunFa 的記帳功能，
	- 所以我需要以下權限
		- 可以看到`Team`裡面有哪些`User`以及這些`User`的權限
		- 可以查看 `ledger`
8. 分享個人 `Team` 的帳本 (關於是否 "自動加入"需要討論)
	- 身為一個 `個人Team` 的 `User`，  
	- 我希望能將 `個人Team` 的帳本分享給 `一般Team` 並與其成員協作，  
	- 所以我需要在被加入 `一般Team` 時，個人 `ledger` 自動加入該 `Team`，並由 `Owner` 管理閱覽權限。 （`一般Team`內擁有某`ledger`閱覽權限的User可以對 該 `ledger`記帳。在該 `一般Team`中 `Owner`與`Administrator`可以調整該`ledger` 的 閱讀與連結權限。）

9. 重大操作的通知
	- 身為一個 `User`，  
	- 我希望在 `Team` 中有重大操作時能即時收到通知，  
	- 所以我需要在以下情況下收到通知：
		- 有人邀請我加入某個 `Team`。
		- 有人為我開啟或關閉某個 `ledger` 的權限。(需要討論)
		- 有人調整我在 `一般Team` 的權限等級。(需要討論)
		- 當我是 `Team Owner` 時，有人的ledger加入我的 `Team`。
10. Teams數量的限制
	- 身為ISunFa的營運商
	- 我希望可以限制`User`可以擁有的`Team`的數量
	- 所以我需要 以 `User`的`Role`去計算，每個Role 最多只能有三個`Team`，其中一個是`個人Team`，另外兩個是`一般Team
11. Ledger數量限制
	- 身為ISunFa的營運商
	- 我希望可以限制用戶可以建立的`Ledger`數量
	- 所以我需要以 `Team`去計算，免費版`Team`只可以建立一個`ledger`，付費版不限制Ledger
12. AI使用次數上限
	- 身為ISunFa的營運商
	- 我希望可以限制免費版用戶可以使用的AI分析次數
	- 所以我需要可以紀錄免費版的team使用多少次的AI分析紀錄
13. `ledger`可以進行`team`之間的轉移
	- 身為`Team`的`Owner`或`Administrator`
	- 我希望可以將`ledger`移轉到不同`team`之下，方便我移轉工作給不同的事務所/公司或是個人
	- 所以我希望可以填寫我想藉由填寫轉移的`Team`的`Team ID` 進行`ledger`轉移。另外我希望是由對方`team`的`Owner`或`Administrator`按下確認才進行轉移。
14. `Team`只要填寫名稱就可以建立
	- 身為`Team`的`Owner`
	- 我希望建立`Team`流程可以更加的簡潔
	- 建立`Team`一開始只需填寫其`Team` name 即可完成建立。其他資訊皆為後續點擊`Team`詳細資訊進行選填:團隊簡介(選填)、團隊相關連結(選填)、團隊銀行帳戶(媒合使用選填)。


### 2.2.4 媒合 (Matching)

>於下次執行，這邊先紀錄，仍需要討論

1. Role 與 發布工作的權限
	- 身為一個 `Role` 是`資方 或 accountant`的 `User` 
		- 我希望可以透過`ISunFa`發布工作，但又希望只有一定權限的`User`才可以作到
		- 所以我需要透過  `一般Team`的 `Owner`或`Administrator` `User` 從 `team`來發布工作
2. Role 與工作媒合的限制
	- 身為一個 `Role` 是`資方`的 `User`
		- 我希望只有經過 `KYC` 認證的其他 `User` 才能承接我發布的工作，
		- 所以我需要 `KYC` 認證作為工作媒合的必要條件。
3. 根據 KYC 區分專業等級
	- 身為一個 `Role` 是 `資方` 的 `User`，  
	- 我希望能根據 `User` 的 KYC 認證結果區分其專業等級，並在發布工作時選擇適合的等級來承接任務，  
	- 所以我需要在 KYC 認證後將 `User` 依照`Role`分為不同的`Level`（如 Normal、CPA），且承接工作時只能看到符合自己等級的任務。
4.  完成任務後的支付流程
    - 身為一個 `Role` 是 `資方` 的 `User`，
    - 我希望在確認工作完成後再支付款項給承接工作的 `Team`， 
    - 所以我需要一個工作確認畫面來核對工作進度並從 `Team` 的錢包支付。
5.  KYC 必要性
	- 身為一個 `Role` 是 `工讀生` 或 `Accountant` 的 `User`，  
	- 我希望在接案前完成個人 KYC 認證，  
	- 所以我需要在媒合之前通過審核，才有資格承接工作。
6. 

### 2.2.4 Subscription

>於下次撰寫與執行



## 3. 產品架構


### 3.1 Pseudo Functions

> 表格按方向鍵左、右可以滑動表格

#### 1. **Role 與 KYC**

| 功能名稱                                              | 功能描述                                                      | 涉及角色                           | API                                                                                                  | 使用者故事編號          |
| ------------------------------------------------- | --------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------- |
| `createUserRole(userId, roleId)` (已經有)            | 新增使用者的 `Role`，並更新對應的功能可用性。                                | User, Role                     | POST `/user/:userId/role`                                                                            | 2.2.2-1          |
| `selectRole`(已經有)                                 | 切換使用者的 `Role`，以便使用不同功能。                                   | User, Role                     | PUT `user/:userId/selected_role`                                                                     | 2.2.2-1          |
| 前端使用`selectedRoleRef (在userContext裡面)`拿阻擋特定頁面的功能? | 切換使用者的 `Role`，以便使用不同功能。                                   | User, Role                     | `userContext`                                                                                        | 2.2.2-1          |
| `getRoleAllowAPI(roleId)`                         | 根據 `Role` 提供允許Access 的 前端 `page url`, 可以寫成constant 或從後端拿取 | User, Role                     | `constants/role`或是 GET `/role/:roleId/allow`                                                         | 2.2.2-2          |
| `createKYC(userId, kyc data)`                     | 使用`bookeeper`和`account`的role時，接案要使用                       | User, KYCBookeeper, KYCAccount | 目前分成 `KYCBookeeper` 和 `KYCAccount` 兩種，可以分成兩個不同api `/user/:userId/bookkeeper`、`/user/:userId/account` | 2.2.4-5          |
| `validateKYC(userId)`                             | 對某個使用者更改他完成 KYC的狀態，作為承接工作或分配專業等級的依據。                      | User, KYCBookeeper, KYCAccount | PUT `/user/:userId/bookkeeper/approved`, PUT `/user/:userId/account/approved`                        | 2.2.4-2, 2.2.4-3 |
|                                                   |                                                           |                                |                                                                                                      |                  |


`Role`的頁面保護可能可以這樣寫
```tsx
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // 從後端或 Cookies 獲取用戶角色
  const userRole = req.cookies.role || "guest";

  if (userRole !== "admin") {
    return {
      redirect: {
        destination: "/not-authorized",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // 頁面正常渲染
  };
};

const AdminPage = () => {
  return <div>只有管理員可以看見此頁面</div>;
};

export default AdminPage;

```

---

#### 2. **Team 相關**

| 功能名稱                                                                      | 功能描述                                                                                                                      | 涉及角色                                 | API(第一個userId指的是發出命令的User,第二個UserId指被影響的對象)                                                                 | 使用者故事編號          |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ---------------- |
| `createDefaultTeamWhenUserCreated`(不是api)                                 | User創立帳號時需要預設綁定到一個`Team`                                                                                                  | User, Teams                          | 不是api                                                                                                       | 2.2.3-8          |
| `createTeam(userId, teamDetails)`                                         | 允許使用者建立新的 `Team` 並成為 `Owner`。                                                                                             | User, Teams, Role(Owner)             | `Post /user/:userId/team/`                                                                                  | 2.2.3-1          |
| `searchUserByEmail(email)`                                                | 邀請其他人加入`Team`的時候，需要先找找看`User`是否存在，存在的話要顯示`User Icon`                                                                      | User                                 | `Get /user/:userId/email/:email`                                                                            | 2.2.3-2          |
| `inviteToTeam(teamId, email)`                                             | 邀請其他人加入 `Team`，Email發送邀請連結(`CreateInvitation`)。                                                                           | Role(Owner, Admin), User, Invitation | `Post /user/:userId/team/:teamId/invitation`                                                                | 2.2.3-2          |
| `inviteToTeamCallback(userId, invitationId)`                              | 不確定要怎麼實做，<br><br>- 希望用戶點入邀請碼連結之後可以導引到的`callback`，可以加入teams，還沒有帳號的話直接先創帳號？？<br>- 已經有帳號的會被直接加到Team嗎？還是說一定要點Email的連結         | User, Role(viewer), Team, Invitation | `Get /user/:userId/team/:teamId/invitation/:invitationId`                                                   | 2.2.3-2          |
| `setTeamAuthorisation(userIdChangeOther, teamId, userIdBeChanged, level)` | 設定 `Team` 成員的權限等級（Owner、Administrator、Viewer），須檢查只有`team owner`可以                                                         | Role(Owner), User, Team              | `Put /user/:userId/team/:teamId/auth/:authId`(可以看是要用database 的`teamAuthId`直接改，還是把user-team relation 放在body) | 2.2.3-3, 2.2.3-4 |
| `editTeamMeta(teamId, metaDetails)`                                       | 編輯 `Team` 的基本資訊（名稱、網站、描述）。                                                                                                | User, Role(Owner), Teams             | `Put /user/:userId/team/:teamId/metadata`                                                                   | 2.2.3-4          |
| `editTeamCashFlowSetting(teamId, cashFlowDetails)`                        | 編輯`Team`有關 金流方面的設定                                                                                                        | User, Role(Owner), Teams             | `Put /user/:userId/team/:teamId/cashflow`(金流可能可以單獨拆出一個table?)                                               | 2.2.3-4          |
| `removeTeamMember(teamId, userId)`                                        | 從 `Team` 中移除成員。(他的帳本也一起被剔除嗎？)                                                                                             | User, Role(Owner), Teams             | `Delete /user/:userId/team/:teamId/user/:userId` (api可能要改動)                                                 | 2.2.3-4          |
| `viewTeamMembers(teamId)`                                                 | 查看 `Team` 中的成員列表及其權限。                                                                                                     | User, Teams                          | `Get /user/:userId/team/:teamId/member`                                                                     | 2.2.3-6          |
| `autoShareLedger(userId, teamId)` (不是api，這個只是用戶被invite到一個team時的動作)        | 當使用者加入 `一般Team` 時，自動將其個人 `ledger` 分享至該 `Team` 並通知 `Owner`。預設`Owner`與上傳的人有權限看                                              | User, Teams, ledger                  |                                                                                                             | 2.2.3-7          |
| `adjustLedgerPermissions(teamId, ledgerId, permissions)`                  | 調整 `ledger` 的可讀或可寫權限。這邊設計成一個`ledger`可以是 全部權限都可以看/`owner, admin`可以, Owner可以看，另外也可以設定 特定`User`可以看，特定`User`可以看是和前三項是 `OR`的關係 | User, Team, teamAuth, ledger         | `Put /user/:userId/team/:teamId/user/:userId/company/:companyId`                                            | 2.2.3-7          |
| `notifyUserOnAction(actionDetails)`(不是api)                                | 當有重大操作（如權限調整、成員加入、`ledger` 加入等）時通知相關使用者。                                                                                  | System                               | `Pusher` 通知                                                                                        | 2.2.3-9          |

---

#### 3. **Matching**
- 不包含於本次產品需求文件中
---

#### 4. **Subscription**
- 不包含於本次產品需求文件中
---

### 3.2 Component 
> 這邊可以放前端 Component的的規劃


## 4. Interface與 Database 設計

### 4.1 Database修改
> 尚未完工


### 4.2 API應該回傳的Interface
> 尚未完工

## 5. 驗收標準
> 尚未完工
