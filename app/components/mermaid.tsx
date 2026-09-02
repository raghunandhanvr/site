"use client"

import React, { useEffect, useId, useRef } from "react"
import * as stylex from "@stylexjs/stylex"

import { styles } from "@/app/styles/ui"

interface SimpleMermaidDiagramProps {
  diagram: string
}

function getIsDark(): boolean {
  const t = document.documentElement.getAttribute("data-theme")
  if (t === "dark") return true
  if (t === "light") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

/**
 * Mermaid only accepts hex/rgb/hsl — not lab()/oklch() from computed CSS vars.
 */
function mermaidThemeVariables(isDark: boolean) {
  if (isDark) {
    return {
      background: "transparent",
      primaryColor: "#1e293b",
      primaryTextColor: "#f5f5f5",
      primaryBorderColor: "#60a5fa",
      lineColor: "#404040",
      secondaryColor: "#262626",
      tertiaryColor: "#333333",
      mainBkg: "#262626",
      secondBkg: "#1a1a1a",
      tertiaryBkg: "#333333",
      primaryTextColorDark: "#f5f5f5",
      edgeLabelBackground: "#1a1a1a",
      clusterBkg: "#262626",
      clusterBorder: "#3f3f3f",
      actorBkg: "#262626",
      actorBorder: "#404040",
      actorTextColor: "#f5f5f5",
      signalColor: "#f5f5f5",
      signalTextColor: "#f5f5f5",
      labelBoxBkgColor: "#1a1a1a",
      labelBoxBorderColor: "#3f3f3f",
      labelTextColor: "#f5f5f5",
      fontSize: "11px",
      fontFamily: "inherit",
    }
  }

  return {
    background: "transparent",
    primaryColor: "#dbeafe",
    primaryTextColor: "#171717",
    primaryBorderColor: "#2563eb",
    lineColor: "#d4d4d4",
    secondaryColor: "#f5f5f5",
    tertiaryColor: "#ededed",
    mainBkg: "#f5f5f5",
    secondBkg: "#ffffff",
    tertiaryBkg: "#ededed",
    primaryTextColorDark: "#171717",
    edgeLabelBackground: "#ffffff",
    clusterBkg: "#f5f5f5",
    clusterBorder: "#e5e5e5",
    actorBkg: "#f5f5f5",
    actorBorder: "#d4d4d4",
    actorTextColor: "#171717",
    signalColor: "#171717",
    signalTextColor: "#171717",
    labelBoxBkgColor: "#ffffff",
    labelBoxBorderColor: "#e5e5e5",
    labelTextColor: "#171717",
    fontSize: "11px",
    fontFamily: "inherit",
  }
}

const SimpleMermaidDiagram: React.FC<SimpleMermaidDiagramProps> = ({
  diagram,
}) => {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const renderSeq = useRef(0)
  const uniqueId = useId().replace(/:/g, "")

  useEffect(() => {
    let cancelled = false

    const renderDiagram = async () => {
      const el = mermaidRef.current
      if (!el) return

      el.innerHTML = ""

      const mermaid = (await import("mermaid")).default
      if (cancelled || mermaidRef.current !== el) return

      const isDark = getIsDark()
      const renderId = `mermaid-${uniqueId}-${++renderSeq.current}`

      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: "basis",
          padding: 8,
          nodeSpacing: 28,
          rankSpacing: 36,
        },
        sequence: {
          useMaxWidth: true,
          boxMargin: 10,
          boxTextMargin: 6,
          noteMargin: 10,
          messageMargin: 24,
          actorFontSize: 11,
          noteFontSize: 10,
          messageFontSize: 11,
        },
        themeVariables: mermaidThemeVariables(isDark),
      })

      try {
        const { svg } = await mermaid.render(renderId, diagram)
        if (cancelled || mermaidRef.current !== el) return
        el.innerHTML = svg
        polishMermaidSvg(el)
      } catch (error) {
        console.error("Mermaid rendering error:", error)
        if (cancelled || mermaidRef.current !== el) return
        el.innerHTML = `<pre>${diagram}</pre>`
      }
    }

    void renderDiagram()

    const obs = new MutationObserver(() => {
      void renderDiagram()
    })
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onMq = () => void renderDiagram()
    mq.addEventListener("change", onMq)

    return () => {
      cancelled = true
      obs.disconnect()
      mq.removeEventListener("change", onMq)
    }
  }, [diagram, uniqueId])

  return (
    <div {...stylex.props(styles.box, styles.mermaidWrap)}>
      <div {...stylex.props(styles.box, styles.mermaidScroll)}>
        <div
          ref={mermaidRef}
          {...stylex.props(styles.box, styles.mermaidBox)}
        />
      </div>
    </div>
  )
}

function polishMermaidSvg(el: HTMLDivElement) {
  const svg = el.querySelector("svg")
  if (svg) {
    svg.style.display = "block"
    svg.style.maxWidth = "100%"
    svg.style.height = "auto"
  }

  el.querySelectorAll<HTMLElement>(".node rect, .node circle, .node ellipse, .node polygon, .node path, .flowchart-link, .actor").forEach((node) => {
    node.style.strokeWidth = "1px"
  })
  el.querySelectorAll<HTMLElement>(".node .label").forEach((node) => {
    node.style.fontSize = "11px"
    node.style.fontWeight = "500"
  })
  el.querySelectorAll<HTMLElement>(".edgeLabel").forEach((node) => {
    node.style.fontSize = "10px"
    node.style.backgroundColor = "transparent"
  })
  el.querySelectorAll<HTMLElement>(".messageText").forEach((node) => {
    node.style.fontSize = "10px"
  })
  el.querySelectorAll<HTMLElement>(".flowchart .node").forEach((node) => {
    node.style.padding = "6px 10px"
  })
}

export default SimpleMermaidDiagram
