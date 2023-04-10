package com.dimuthu.socmedauthservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = FieldsValueMatchValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldsValueMatch {

  String message() default "Field values don't match!";

  String field();

  String fieldMatch();
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
  @Target({ ElementType.TYPE })
  @Retention(RetentionPolicy.RUNTIME)
  @interface List {
    FieldsValueMatch[] value();
  }
}