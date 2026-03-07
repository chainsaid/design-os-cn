import { FileText, Map, ClipboardList, Database, Layout, Package, Boxes, Palette, PanelLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type EmptyStateType = 'overview' | 'roadmap' | 'spec' | 'data' | 'screen-designs' | 'data-shape' | 'design-system' | 'shell' | 'export'

interface EmptyStateProps {
  type: EmptyStateType
}

const config: Record<EmptyStateType, {
  icon: typeof FileText
  title: string
  command: string
  description: string
}> = {
  overview: {
    icon: FileText,
    title: '尚未定义产品',
    command: '/product-vision',
    description: '定义产品愿景、核心问题和功能特性',
  },
  roadmap: {
    icon: Map,
    title: '尚未定义路线图',
    command: '/product-roadmap',
    description: '将产品拆分为开发模块',
  },
  spec: {
    icon: ClipboardList,
    title: '尚未定义规范',
    command: '/shape-section',
    description: '定义用户流程和 UI 要求',
  },
  data: {
    icon: Database,
    title: '尚未生成示例数据',
    command: '/sample-data',
    description: '为界面设计创建真实示例数据',
  },
  'screen-designs': {
    icon: Layout,
    title: '尚未创建界面设计',
    command: '/design-screen',
    description: '为此模块创建界面设计',
  },
  'data-shape': {
    icon: Boxes,
    title: '尚未定义数据模型',
    command: '/data-shape',
    description: '勾勒产品数据的一般结构',
  },
  'design-system': {
    icon: Palette,
    title: '尚未定义原子设计',
    command: '/design-tokens',
    description: '选择产品的颜色和字体',
  },
  shell: {
    icon: PanelLeft,
    title: '尚未设计应用容器',
    command: '/design-shell',
    description: '设计导航和布局',
  },
  export: {
    icon: Package,
    title: '准备导出',
    command: '/export-product',
    description: '生成完整的交接包',
  },
}

export function EmptyState({ type }: EmptyStateProps) {
  const { icon: Icon, title, command, description } = config[type]

  return (
    <Card className="border-stone-200 dark:border-stone-700 shadow-sm border-dashed">
      <CardContent className="py-8">
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-3">
            <Icon className="w-5 h-5 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-medium text-stone-600 dark:text-stone-400 mb-1">
            {title}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
            {description}
          </p>
          <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5 w-full">
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">
              在 Claude Code 中运行：
            </p>
            <code className="text-sm font-mono text-stone-700 dark:text-stone-300">
              {command}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
