import { Injectable } from '@angular/core';
import { Chart, Plugin } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class LegendService {
  getCustomLegendPlugin(
    circleSize: number = 12,
    textOffset: number = 10,
    paddingBottom: number = 10
  ): Plugin {
    return {
      id: 'customLegend',
      afterDraw: (chart: Chart) => {
        const ctx = chart.ctx;
        const { width, height } = chart;
        const labels = chart.data.labels as string[];
        const colors = chart.data.datasets[0].backgroundColor as string[];

        if (!labels || !colors) return;

        ctx.save();
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        const itemSpacing = 30; // Khoảng cách giữa các mục legend
        const maxRowWidth = width - 40; // Giới hạn chiều rộng legend

        let legendY = height - paddingBottom; // Sát mép dưới
        let items = labels.map((label, index) => ({
          color: colors[index],
          label,
          width:
            ctx.measureText(label).width +
            circleSize +
            textOffset +
            itemSpacing,
        }));

        let row1: typeof items = [];
        let row2: typeof items = [];
        let rowWidth = 0;
        let splitIndex = -1;

        // Chia thành 2 dòng nếu cần
        for (let i = 0; i < items.length; i++) {
          if (rowWidth + items[i].width > maxRowWidth && row1.length > 0) {
            splitIndex = i;
            break;
          }
          row1.push(items[i]);
          rowWidth += items[i].width;
        }
        row2 = splitIndex !== -1 ? items.slice(splitIndex) : [];

        // Xác định dòng dài nhất
        const row1Width = row1.reduce((sum, item) => sum + item.width, 0);
        const row2Width = row2.reduce((sum, item) => sum + item.width, 0);
        const maxWidth = Math.max(row1Width, row2Width);

        // Căn chỉnh theo dòng dài nhất
        const startX = (width - maxWidth) / 2;

        // Vẽ dòng 1
        this.drawLegendRow(ctx, row1, startX, legendY, circleSize, textOffset);

        if (row2.length > 0) {
          legendY -= 25; // Cách đều nhau
          this.drawLegendRow(
            ctx,
            row2,
            startX,
            legendY,
            circleSize,
            textOffset
          );
        }

        ctx.restore();
      },
    };
  }

  private drawLegendRow(
    ctx: CanvasRenderingContext2D,
    items: { color: string; label: string; width: number }[],
    startX: number,
    y: number,
    circleSize: number,
    textOffset: number
  ) {
    let x = startX;
    items.forEach(({ color, label }) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, circleSize / 2, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.fillText(label, x + circleSize + textOffset, y);

      x += circleSize + textOffset + ctx.measureText(label).width + 30; // Giữ khoảng cách đều
    });
  }
}
