package com.algaworks.algamoney.api.config.property;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties("algamoney")
@Component
@Getter
@Setter
public class AlgamoneyApiProperty {

	private String originPermitida = "http://localhost:4200";

	private final Seguranca seguranca = new Seguranca();

	private final Mail mail = new Mail();

	private final S3 s3 = new S3();

	@Getter
	@Setter
	public static class S3 {
		private String accessKeyId;

		private String secretAccessKey;

		private String bucket = "cg-algamoney-arquivos2";
	}

	@Setter
	@Getter
	public static class Seguranca {

		private List<String> redirectsPermitidos;
		private String authServerUrl;
		
	}

	@Getter
	@Setter
	public static class Mail {

		private String host;

		private Integer port;

		private String username;
		private String password;
	}
}
