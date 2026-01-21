import React from "react";
import type { PostSummary } from "../../types/post";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

export type PostGridProps = {
    posts: PostSummary[];
    isLoading?: boolean;
    emptyText?: string;
    className?: string;
    gapClassName?: string;

    onClickPost?: (postId: number) => void;
};

const PostGrid: React.FC<PostGridProps> = ({
    posts,
    isLoading,
    emptyText = "포스트가 없어여",
    className,
    gapClassName,
    onClickPost,
}) => {
    const navigate = useNavigate();
    if (isLoading) {
        return (
            <div className={className}>
                <div className={["grid grid-cols-2", gapClassName ?? "gap-4"].join(" ")}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                            <div className="aspect-[16/9] bg-gray-100 animate-pulse" />
                            <div className="p-4 space-y-2">
                                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                                <div className="h-4 bg-gray-100 rounded w-4/5 animate-pulse" />
                                <div className="h-3 bg-gray-100 rounded w-2/5 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!posts.length) {
        return (
            <div
                className={[
                    "rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500",
                    className ?? "",
                ].join(" ")}
            >
                {emptyText}
            </div>
        );
    }

    return (
        <div className={className}>
            <div className={["grid grid-cols-1 sm:grid-cols-2", gapClassName ?? "gap-4"].join(" ")}>
                {posts.map((p) => (
                    <PostCard
                        key={p.postId}
                        post={p}
                        onClick={onClickPost}
                        onClickAuthor={(userId) => {
                            navigate(`/users/${userId}`);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostGrid;