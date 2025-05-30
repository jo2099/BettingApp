package com.BettingApp.main.util;

public interface Publisher<T> {
  void publish(T item);

  void subscribe(Subscriber<T> subscriber);

  void unsubscribe(Subscriber<T> subscriber);
}
