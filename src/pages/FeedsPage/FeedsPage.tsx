import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FeedsPage.module.css";
import { OrdersFeedsList } from "../../components/OrdersFeedList/OrdersFeedList";
import OrdersBoardStatus from "../../components/OrdersBoard/OrdersBoardStatus";
import { IRootReducer, Store } from "../../services/store";
import { TOrderState } from "../../services/reducers/feed/reducer";
import { BURGER_API_WSS_FEED } from "../../utils/api";
import { wsConnectFeed, wsDisconnectFeed } from "../../services/reducers/feed/actions";



export const FeedsPage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectFeed({wsUrl: BURGER_API_WSS_FEED, withTokenRefresh: false}))
    return () => {
      dispatch(wsDisconnectFeed())
    }
  }, []);

    const { data } = useSelector<IRootReducer, TOrderState>((store) => {
      console.log(store);
      return store.liveOrder;
    });

    console.log(data);

    return (
        data && (
            <div className={styles.wrapper}>
                <div className={styles.content_wrapper}>
                    <h1
                        className={`${styles.title} text text_type_main-medium  mb-5 mt-10`}
                    >
                        Лента заказов
                    </h1>
                    <div className={styles.feeds_wrapper}>
                        <OrdersFeedsList path="feed" data={data} />
                        <OrdersBoardStatus />
                    </div>
                </div>
            </div>
        )
    );
};

