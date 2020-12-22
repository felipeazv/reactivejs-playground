package com.feazesa.fun;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@RequestMapping("/api/token")
@RestController
public class Token {

    @Value("${keycloak.auth-server-url}")
    private String keycloakAuthURL;

    private final RestTemplate restTemplate;

    public Token(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> retrieveTokenInfo(@RequestBody TokenInfo tokenInfo) {
        final var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        final var map = new LinkedMultiValueMap<String, String>();
        map.add("grant_type", "client_credentials");
        map.add("client_id", tokenInfo.getId());
        map.add("client_secret", tokenInfo.getKey().toString());

        final var entity = new HttpEntity<MultiValueMap<String, String>>(map, headers);

        final var response = restTemplate.exchange(keycloakAuthURL + "/realms/tasks/protocol/openid-connect/token",
                HttpMethod.POST,
                entity,
                String.class);

        System.out.println("response = " + response.getBody());

        return response;
    }

    @Getter
    static class TokenInfo {
        @JsonAlias("client_id")
        private String id;
        @JsonAlias("client_secret")
        private UUID key;

        @SuppressWarnings("unused")
        private TokenInfo() {
        }

        public TokenInfo(String id, String key) {
            this.id = id;
            this.key = UUID.fromString(key);
        }
    }

    @Configuration
    static class TokenConfiguration {
        @Bean
        public RestTemplate restTemplate() {
            return new RestTemplate();
        }
    }

    public static void main(String[] args) {

        final var tokeninfo = new TokenInfo("task-client", "ef3f048c-70a8-4db5-807b-cfdab41d9a7d");
        final var response = new Token(new RestTemplate()).retrieveTokenInfo(tokeninfo);
        System.out.println(response);
    }
}
