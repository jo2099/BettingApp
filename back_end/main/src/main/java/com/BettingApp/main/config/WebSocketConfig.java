package com.BettingApp.main.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic"); // Broker para envio de mensagens
    config.setApplicationDestinationPrefixes("/app"); // Prefixo para mensagens recebidas do cliente
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws-game")
        // TODO
        // mudar as orignes permitidas para o dominio correto do front end
        .setAllowedOrigins("*")
        .withSockJS();
  }
}
