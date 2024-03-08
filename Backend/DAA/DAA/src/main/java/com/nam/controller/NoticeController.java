package com.nam.controller;

import com.nam.model.Notice;
import com.nam.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeRepository noticeRepository;

    @PostMapping("/create")
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        notice.setCreatedAt(LocalDateTime.now());

        noticeRepository.save(notice);

        return new ResponseEntity<>(notice, HttpStatus.CREATED);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Notice>> getAllNotice() {

        List<Notice> notices = noticeRepository.findAll();
        return new ResponseEntity<>(notices, HttpStatus.OK);
    }
}


