import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Projects() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isSpread, setIsSpread] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Pictures",
      icon: "📷",
      color: "linear-gradient(135deg, #87CEEB 0%, #7EC8E3 100%)",
      coverImage:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 2,
      title: "Videos",
      icon: "🎥",
      color: "linear-gradient(135deg, #87CEEB 0%, #7EC8E3 100%)",
      coverImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      videos: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
      ],
    },
    {
      id: 3,
      title: "Designs",
      icon: "🎨",
      color: "linear-gradient(135deg, #87CEEB 0%, #7EC8E3 100%)",
      coverImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      designs: [
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop",
      ],
    },
  ];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // IntersectionObserver untuk detect scroll (spread effect di desktop)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSpread(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (projectId) => {
    if (flippedCard === projectId) {
      const project = projects.find((p) => p.id === projectId);
      setSelectedMedia(project);
    } else {
      setFlippedCard(projectId);
    }
  };

  // Ukuran kartu tetap sama di semua device
  const cardSize = { width: 260, height: 360 };

  // Posisi kartu
  const getCardPosition = (index, total) => {
    if (isMobile) {
      // Jarak antar kartu mobile kecil (20px)
      return { x: 0, y: index * 20, rotate: 0 };
    }

    if (!isSpread) return { x: 0, y: index * 5, rotate: 0 };

    const spreadX = window.innerWidth < 1024 ? 250 : 310;
    const spreadY = 20;
    const middle = (total - 1) / 2;
    const offset = index - middle;

    return { x: offset * spreadX, y: Math.abs(offset) * spreadY, rotate: 0 };
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        background: "#1A3D64",
        padding: isMobile ? "20px 20px 20px" : "20px 20px 20px",
        color: "#fff",
        scrollMarginTop: "10px",
      }}>
      <h2
        style={{
          fontSize: isMobile ? "32px" : "48px",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "700",
          background: "linear-gradient(to right, #ffffffff, #f4f4f4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
        My Portfolio
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: isMobile ? "30px" : "30px",
          fontSize: isMobile ? "14px" : "18px",
          padding: isMobile ? "0 10px" : "0",
        }}>
        Klik sekali untuk flip • Klik lagi untuk lihat koleksi
      </p>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Stack of Cards */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          minHeight: isMobile
            ? `${projects.length * (cardSize.height / 2 + 20)}px`
            : "600px",
          display: "flex",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "unset",
          paddingTop: isMobile ? "10px" : "10px",
          alignItems: isMobile ? "center" : "flex-start",
        }}>
        {projects.map((project, index) => {
          const pos = getCardPosition(index, projects.length);
          const isFlipped = flippedCard === project.id;

          return (
            <div
              key={project.id}
              onClick={() => handleCardClick(project.id)}
              style={{
                position: isMobile ? "relative" : "absolute",
                width: `${cardSize.width}px`,
                height: `${cardSize.height}px`,
                cursor: "pointer",
                perspective: "2000px",
                transform: isMobile
                  ? `translateY(${pos.y}px)`
                  : `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${pos.rotate}deg)`,
                transition: isMobile
                  ? "transform 1s ease"
                  : "transform 1s cubic-bezier(0.4,0,0.2,1), z-index 0.5s",
                zIndex: isFlipped ? 100 : 10 - index,
                marginBottom: isMobile ? "20px" : "0",
              }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s cubic-bezier(0.4,0.2,0.2,1)",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}>
                {/* FRONT SIDE */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px",
                      left: "-4px",
                      right: "-4px",
                      bottom: "-4px",
                      background: project.color,
                      borderRadius: "25px",
                      opacity: 0.6,
                      filter: "blur(25px)",
                      zIndex: -1,
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "25px",
                      overflow: "hidden",
                      border: "3px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                      background: "#000",
                    }}>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.95), transparent)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: isMobile ? "15px" : "20px",
                      }}>
                      <div
                        style={{
                          fontSize: isMobile ? "28px" : "34px",
                          marginBottom: "6px",
                          textShadow: "0 0 20px rgba(255,215,0,0.5)",
                        }}>
                        {project.icon}
                      </div>
                      <h3
                        style={{
                          fontSize: isMobile ? "20px" : "24px",
                          fontWeight: "800",
                          marginBottom: "5px",
                          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                        }}>
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px",
                      left: "-4px",
                      right: "-4px",
                      bottom: "-4px",
                      background: project.color,
                      borderRadius: "25px",
                      opacity: 0.8,
                      filter: "blur(25px)",
                      zIndex: -1,
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      background: project.color,
                      borderRadius: "25px",
                      border: "3px solid rgba(255,255,255,0.4)",
                      boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                      padding: isMobile ? "20px" : "28px",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div
                        style={{
                          fontSize: isMobile ? "36px" : "44px",
                          marginBottom: "12px",
                          textAlign: "center",
                          textShadow: "0 0 30px rgba(255,255,255,0.5)",
                        }}>
                        {project.icon}
                      </div>
                      <h3
                        style={{
                          fontSize: isMobile ? "22px" : "26px",
                          marginBottom: "12px",
                          fontWeight: "800",
                          textAlign: "center",
                        }}>
                        {project.title}
                      </h3>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "12px",
                          marginTop: isMobile ? "10px" : "15px",
                        }}>
                        <div
                          style={{
                            padding: isMobile ? "10px" : "12px",
                            background: "rgba(255,255,255,0.15)",
                            borderRadius: "10px",
                            backdropFilter: "blur(10px)",
                            textAlign: "center",
                            border: "2px solid rgba(255,255,255,0.25)",
                          }}>
                          <p
                            style={{
                              fontSize: isMobile ? "12px" : "14px",
                              fontWeight: "700",
                              marginBottom: "5px",
                            }}>
                            Collection Size
                          </p>
                          <p
                            style={{
                              fontSize: isMobile ? "20px" : "24px",
                              fontWeight: "800",
                            }}>
                            {project.images
                              ? project.images.length
                              : project.videos
                              ? project.videos.length
                              : project.designs.length}
                          </p>
                        </div>
                        <div
                          style={{
                            padding: isMobile ? "12px" : "14px",
                            background: "rgba(0,0,0,0.3)",
                            borderRadius: "10px",
                            backdropFilter: "blur(10px)",
                            textAlign: "center",
                            border: "2px solid rgba(255,255,255,0.3)",
                            fontWeight: "700",
                            fontSize: isMobile ? "11px" : "13px",
                            lineHeight: "1.4",
                          }}>
                          Click Again to View Full Collection
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedMedia && (
        <div
          onClick={() => {
            setSelectedMedia(null);
            setFlippedCard(null);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.95)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "20px" : "40px",
            overflowY: "auto",
            animation: "fadeIn 0.3s ease",
          }}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #1e293b, #0f172a)",
              borderRadius: isMobile ? "20px" : "30px",
              maxWidth: "1200px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              border: "2px solid rgba(255,255,255,0.1)",
              boxShadow: "0 50px 100px rgba(0,0,0,0.5)",
              animation: "slideUp 0.4s ease",
            }}>
            <button
              onClick={() => {
                setSelectedMedia(null);
                setFlippedCard(null);
              }}
              style={{
                position: "sticky",
                top: "20px",
                left: isMobile ? "calc(100% - 50px)" : "calc(100% - 60px)",
                background: selectedMedia.color,
                border: "none",
                borderRadius: "50%",
                width: isMobile ? "40px" : "50px",
                height: isMobile ? "40px" : "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                zIndex: 10,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "rotate(90deg) scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "rotate(0) scale(1)")
              }>
              <X size={isMobile ? 20 : 24} />
            </button>

            <div style={{ padding: isMobile ? "40px 20px" : "60px 50px" }}>
              <div
                style={{
                  background: selectedMedia.color,
                  padding: isMobile ? "25px" : "40px",
                  borderRadius: isMobile ? "15px" : "20px",
                  marginBottom: isMobile ? "25px" : "40px",
                  textAlign: "center",
                }}>
                <div
                  style={{
                    fontSize: isMobile ? "48px" : "64px",
                    marginBottom: "15px",
                  }}>
                  {selectedMedia.icon}
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "28px" : "42px",
                    marginBottom: "10px",
                    fontWeight: "800",
                  }}>
                  {selectedMedia.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "14px" : "18px",
                    opacity: 0.95,
                  }}>
                  {selectedMedia.images
                    ? `${selectedMedia.images.length} Photos`
                    : selectedMedia.videos
                    ? `${selectedMedia.videos.length} Videos`
                    : `${selectedMedia.designs.length} Designs`}
                </p>
              </div>

              {/* Render koleksi */}
              {selectedMedia.images && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: isMobile ? "15px" : "25px",
                  }}>
                  {selectedMedia.images.map((img, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: "relative",
                        borderRadius: isMobile ? "15px" : "20px",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        !isMobile &&
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        !isMobile &&
                        (e.currentTarget.style.transform = "scale(1)")
                      }>
                      <img
                        src={img}
                        alt={`Photo ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: isMobile ? "250px" : "300px",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {selectedMedia.videos && (
                <div
                  style={{ display: "grid", gap: isMobile ? "20px" : "30px" }}>
                  {selectedMedia.videos.map((video, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        overflow: "hidden",
                        borderRadius: isMobile ? "15px" : "20px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      }}>
                      <iframe
                        src={video}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              )}

              {selectedMedia.designs && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: isMobile ? "15px" : "25px",
                  }}>
                  {selectedMedia.designs.map((design, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: "relative",
                        borderRadius: isMobile ? "15px" : "20px",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        !isMobile &&
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        !isMobile &&
                        (e.currentTarget.style.transform = "scale(1)")
                      }>
                      <img
                        src={design}
                        alt={`Design ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: isMobile ? "250px" : "300px",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
