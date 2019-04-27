// import Vue from 'vue'
import Router from 'vue-router'

const HomeComponent = () => import(/* webpackChunkName: 'home' */ '@/components/home/home.vue')
const ShopComponent = () => import(/* webpackChunkName: 'shop' */ '@/components/home/shop/shop.vue')
const CreditComponent = () => import(/* webpackChunkName: 'credit' */ '@/components/home/credit/credit.vue')
const IndexComponent = () => import(/* webpackChunkName: 'index' */ '@/components/home/index/index.vue')
const MineComponent = () => import(/* webpackChunkName: 'mine' */ '@/components/home/mine/mine.vue')
const EmpowerComponent = () => import(/* webpackChunkName: 'empower' */ '@/components/empower/empower.vue')
const CreditIdentityComponent = () => import(/* webpackChunkName: 'mine' */ '@/components/credit-identity/credit-identity.vue')
const CreditContactComponent = () => import(/* webpackChunkName: 'credit-contact' */ '@/components/credit-contact/credit-contact.vue')
const BorrowRecordComponent = () => import(/* webpackChunkName: 'borrow-record' */ '@/components/borrow-record/borrow-record.vue')
const WannaRefundComponent = () => import(/* webpackChunkName: 'wanna-refund' */ '@/components/wanna-refund/wanna-refund.vue')
const RecordDetailComponent = () => import(/* webpackChunkName: 'record-detail' */ '@/components/record-detail/record-detail.vue')
const BorrrowConfirmComponent = () => import(/* webpackChunkName: 'borrrow-confirm' */ '@/components/borrrow-confirm/borrrow-confirm.vue')
const SetComponent = () => import(/* webpackChunkName: 'set' */ '@/components/set/set.vue')
const ComplainComponent = () => import(/* webpackChunkName: 'complain' */ '@/components/complain/complain.vue')
const MineBankCardComponent = () => import(/* webpackChunkName: 'mine-bank-card' */ '@/components/mine-bank-card/mine-bank-card.vue')
const AddBankCardComponent = () => import(/* webpackChunkName: 'add-bank-card' */ '@/components/add-bank-card/add-bank-card.vue')
const MessageComponent = () => import(/* webpackChunkName: 'message' */ '@/components/message/message.vue')
const MessageDetailComponent = () => import(/* webpackChunkName: 'message-detail' */ '@/components/message-detail/message-detail.vue')
const CreditTaobaoComponent = () => import(/* webpackChunkName: 'credit-taobao' */ '@/components/credit-taobao/credit-taobao.vue')
const CreditOperatorComponent = () => import(/* webpackChunkName: 'credit-operator' */ '@/components/credit-operator/credit-operator.vue')
const RefundStepComponent = () => import(/* webpackChunkName: 'refund-step' */ '@/components/refund-step/refund-step.vue')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeComponent,
      children: [
        {
          path: '/index',
          name: 'index',
          component: IndexComponent,
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/shop',
          name: 'shop',
          component: ShopComponent,
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/credit',
          name: 'credit',
          component: CreditComponent,
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/mine',
          name: 'mine',
          component: MineComponent,
          meta: {
            requireAuth: true,
          }
        }
      ],
      redirect: 'index'
    },
    {
      path: '/',
      name: 'empower',
      component: EmpowerComponent
    },
    {
      path: '/empower',
      name: 'empower',
      component: EmpowerComponent
    },
    {
      path: '/credit-identity',
      name: 'credit-identity',
      component: CreditIdentityComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/credit-contact',
      name: 'credit-contact',
      component: CreditContactComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/borrow-record',
      name: 'borrow-record',
      component: BorrowRecordComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/wanna-refund',
      name: 'wanna-refund',
      component: WannaRefundComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/record-detail',
      name: 'record-detail',
      component: RecordDetailComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/borrrow-confirm',
      name: 'borrrow-confirm',
      component: BorrrowConfirmComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/set',
      name: 'set',
      component: SetComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/complain',
      name: 'complain',
      component: ComplainComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/mine-bank-card',
      name: 'mine-bank-card',
      component: MineBankCardComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/add-bank-card',
      name: 'add-bank-card',
      component: AddBankCardComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/message',
      name: 'message',
      component: MessageComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/message-detail',
      name: 'message-detail',
      component: MessageDetailComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/credit-taobao',
      name: 'credit-taobao',
      component: CreditTaobaoComponent,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/credit-operator',
      name: 'credit-operator',
      component: CreditOperatorComponent,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/refund-step',
      name: 'refund-step',
      component: RefundStepComponent,
      meta: {
        requireAuth: true
      }
    }
  ]
})

