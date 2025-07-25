package com.java.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.java.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {


    
}
