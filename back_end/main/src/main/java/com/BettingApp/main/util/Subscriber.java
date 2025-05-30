package com.BettingApp.main.util;

public interface Subscriber<T> {
  void receive(T item);

}
