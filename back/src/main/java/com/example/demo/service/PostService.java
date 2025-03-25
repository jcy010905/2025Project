package com.example.demo.service;

import com.example.demo.dto.PostRequestDto;
import com.example.demo.dto.PostResponseDto;
import com.example.demo.entity.Post;
import com.example.demo.entity.User;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

        private final PostRepository postRepository;
        private final UserRepository userRepository;

        public PostResponseDto createPost(PostRequestDto requestDto, String username) {
                User author = userRepository.findByUsername(username)
                        .orElseThrow(() -> new IllegalArgumentException("사용자 정보가 없습니다."));
                
                Post post = Post.builder()
                        .title(requestDto.getTitle())
                        .content(requestDto.getContent())
                        .author(author)
                        .build();
                
                Post savedPost = postRepository.save(post);
                
                return PostResponseDto.builder()
                        .id(savedPost.getId())
                        .title(savedPost.getTitle())
                        .content(savedPost.getContent())
                        .authorUsername(savedPost.getAuthor().getUsername())
                        .createdAt(post.getCreatedAt().toString())
                        .build();
                }

        public List<PostResponseDto> getAllPosts() {
                return postRepository.findAll().stream().map(post ->
                        PostResponseDto.builder()
                        .id(post.getId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .authorUsername(post.getAuthor().getUsername())
                        .createdAt(post.getCreatedAt().toString())
                        .build()
                ).toList();
        }

        public PostResponseDto updatePost(Long id, PostRequestDto dto, String username) {
                Post post = postRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
                
                // 작성자 본인인지 검사
                if (!post.getAuthor().getUsername().equals(username)) {
                        throw new SecurityException("작성자만 수정할 수 있습니다.");
                }
                
                post.setTitle(dto.getTitle());
                post.setContent(dto.getContent());
                postRepository.save(post);
                
                return PostResponseDto.builder()
                        .id(post.getId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .authorUsername(username)
                        .createdAt(post.getCreatedAt().toString())
                        .build();
                }


                public void deletePost(Long id, String username) {
                        Post post = postRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
                        
                        if (!post.getAuthor().getUsername().equals(username)) {
                                throw new SecurityException("작성자만 삭제할 수 있습니다.");
                        }
                        
                        postRepository.delete(post);
                        }

        public PostResponseDto getPostById(Long id) {
                Post post = postRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
                
                return PostResponseDto.builder()
                        .id(post.getId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .authorUsername(post.getAuthor().getUsername())
                        .createdAt(post.getCreatedAt().toString())
                        .build();
        }


}

