<template>
  <div class="home-hero">
    <div class="hero-content">
      <div class="hero-avatar">
        <img :src="heroImage" alt="Logo" />
      </div>
      <h1 class="hero-title">{{ heroText }}</h1>
      <p class="hero-tagline">{{ tagline }}</p>
      <div class="hero-actions">
        <a
          v-for="action in actions"
          :key="action.text"
          :href="action.link"
          class="hero-action"
          :class="`hero-action-${action.type}`"
        >
          {{ action.text }}
        </a>
      </div>
    </div>
    <div class="hero-features">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="hero-feature"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="feature-icon">{{ getFeatureIcon(index) }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.details }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const heroImage = computed(() => '/logo.png')
const heroText = computed(() => 'AIGC 技术咨询专家')
const tagline = computed(() => '帮助中小企业落地 AIGC，降低内容成本，提升效率')

const actions = computed(() => [
  {
    text: '关于我',
    link: '/about.html',
    type: 'primary',
  },
  {
    text: '技术文章',
    link: '/articles/',
    type: 'secondary',
  },
])

const features = computed(() => [
  {
    title: 'AIGC 落地实战',
    details: '帮助企业评估 AIGC 应用场景，选择合适的工具，制定实施策略',
  },
  {
    title: '技术咨询',
    details: '提供 AI 技术咨询，包括方案设计、技术选型、团队培训',
  },
  {
    title: '定制开发',
    details: '根据业务需求，定制开发 AIGC 工具和解决方案',
  },
])

function getFeatureIcon(index: number): string {
  const icons = ['🎯', '💡', '🚀']
  return icons[index] || '✨'
}
</script>

<style scoped>
.home-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

.hero-avatar {
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

.hero-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: white;
  padding: 10px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-tagline {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.hero-action {
  display: inline-block;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hero-action-primary {
  background: white;
  color: #667eea;
}

.hero-action-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.hero-action-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.hero-action-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
}

.hero-feature {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out backwards;
}

.hero-feature:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-feature h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-feature p {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-tagline {
    font-size: 1.2rem;
  }

  .hero-features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
