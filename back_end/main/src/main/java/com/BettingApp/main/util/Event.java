package com.BettingApp.main.util;

public interface Event {

  String getType();

  String getMessage();

  String toJson();

}
