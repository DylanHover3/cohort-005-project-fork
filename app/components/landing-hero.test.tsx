import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { LandingHero } from "./landing-hero";

function renderHero() {
  return renderToStaticMarkup(
    <MemoryRouter>
      <LandingHero />
    </MemoryRouter>
  );
}

function classesOf(html: string, tag: string) {
  return [
    ...html.matchAll(new RegExp(`<${tag}\\b[^>]*class="([^"]*)"`, "g")),
  ].flatMap((match) => match[1].split(/\s+/));
}

describe("LandingHero", () => {
  it("does not centre the hero text or its call to action", () => {
    const html = renderHero();
    const layout = ["section", "div", "h1", "p"].flatMap((tag) =>
      classesOf(html, tag)
    );
    expect(layout).not.toContain("text-center");
    expect(layout).not.toContain("justify-center");
    expect(classesOf(html, "p")).not.toContain("mx-auto");
  });

  it("keeps the existing copy and the single Browse Courses button", () => {
    const html = renderHero();
    expect(html).toContain(
      'Learn to code,<br/><span class="text-muted-foreground">at your own pace</span>'
    );
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)];
    expect(links.map((link) => link[1])).toEqual(["/courses"]);
    expect(html).toContain("Browse Courses");
  });

  it("lays the text and a decorative illustration side by side on wide screens", () => {
    const html = renderHero();
    expect(classesOf(html, "section")).toContain("lg:grid-cols-2");
    expect(html).toMatch(
      /<svg\b[^>]*aria-hidden="true"[^>]*data-testid="hero-illustration"/
    );
  });
});
